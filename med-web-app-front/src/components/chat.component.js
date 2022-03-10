import {Card, Checkbox, Paper, TextField, withStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import UserService from "../services/user.service";
import Grid from "@material-ui/core/Grid";
import AuthService from "../services/auth.service";
import Button from "@material-ui/core/Button";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

import {over} from 'stompjs';
// import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client';
import UserCardMessage from "./user-card-msg.component";
import ChatService from "../services/chat.service";
import authHeader from "../services/auth-header";
import {statusMsg} from "../App"

const useStyles = theme => ({
    root: {
        // width: 635,
        marginBottom: theme.spacing(1.5),
        "& .MuiFormLabel-root": {
            margin: 0,
            color: "black"
        }
    },
    paper: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
        // padding: theme.spacing(3),
        // marginLeft: theme.spacing(1),
        // padding: theme.spacing(1),
        color: "black",
        // display: 'flex',
        minHeight: 600,
    },
    paper2: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(3),
        color: "black",
        minHeight: 600,
        width: 700
    },
    mainGrid: {
        display: 'flex',
        minWidth: 1000,
        marginTop: theme.spacing(-2)
    },
    button: {
        width: 220,
        '&:active': {
            backgroundColor: '#bdff59',
            // color: '#fff',
        }
    },
    messageGrid: {
        width: 650,
        height: 440,
        overflowY: "auto",
        overflowX: "visible",
        marginBottom: theme.spacing(1.5),
    },
    msgMy: {
        width: "fit-content",
        height: "fit-content",
        margin: 20,
        marginLeft: "auto",
        backgroundColor: '#a1e9ff',
        padding: theme.spacing(0.5),
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        maxWidth: 400,
    },
    msgNotMy: {
        width: "fit-content",
        height: "fit-content",
        margin: 20,
        padding: theme.spacing(0.5),
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        maxWidth: 400,
        elevation: 2
    },
    txt: {
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 10
    },
});

var stompClient = null;
const API_URL = process.env.REACT_APP_API_URL;

function Chat(props) {
    const {classes} = props;
    const {stompClient} = props;
    const {messages} = props;
    const {number} = props;
    const {newUsers} = props;
    const {minusUnRead} = props
    const [numberOfUnRead, setNumberOfUnRead] = useState(number);
    const [allMessages, setAllMessages] = useState(messages);
    const [content, setContent] = useState("");
    const [contentPresence, setContentPresence] = useState(false);
    const [contentCorrect, setContentCorrect] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState(newUsers);
    const [connected, setConnected] = useState(false);
    const [refresh, setRefresh] = useState({});


    useEffect(() => {
        getUsers();
        // connectToChat();
        // return () => {
        //     stompClient.unsubscribe();
        // };
    }, [allMessages, refresh]);


    // function connectToChat() {
    //     let Sock = new SockJS('http://localhost:7999/api/ws');
    //     stompClient = over(Sock);
    //     stompClient.connect({}, onConnected, onError);
    // }

    function getUsers() {
        const {searchString} = ""
        UserService.getAllByUsername(searchString)
            .then((response) => {
                const users = response.data;
                setUsers(users);
                // setRefresh({});
            })
            .catch((e) => {
                console.log(e);
            });
    }

    // function onMessageReceived(response) {
    //     console.log(allMessages);
    //     var data = JSON.parse(response.body);
    //     if (allMessages.get(data.senderName)) {
    //         console.log("я тут")
    //         var need = {
    //             content: data.content,
    //             recipientId: data.recipientId,
    //             recipientName: data.recipientName,
    //             senderId: data.senderId,
    //             senderName: data.senderName,
    //         }
    //         let list = allMessages.get(data.senderName);
    //         list.push(data);
    //         setAllMessages(prev => (prev.set(data.senderName, list)));
    //         console.log(allMessages);
    //     } else {
    //         let list = [];
    //         list.push(data);
    //         setAllMessages(prev => (prev.set(data.senderName, list)));
    //         console.log(allMessages);
    //     }
    //     setRefresh({});
    // }

    // function onConnected() {
    //     stompClient.subscribe('/topic/' + AuthService.getCurrentUser().username + '/private', onMessageReceived);
    // }
    //
    // function onError(err) {
    //     console.log(err);
    // }

    function onChangeMessageContent(e) {
        let str = e.target.value
        console.log(str);
        str = str.replace(/ {2,}/g, ' ').trim();
        str = str.replace(/[\n\r ]{3,}/g, '\n\r\n\r');
        if (str.charCodeAt(0) > 32) {
            setContent(e.target.value)
            setContentCorrect(str)
            setContentPresence(true)
        } else {
            setContent(e.target.value)
            setContentCorrect(str)
            setContentPresence(false)
        }
    }

    function sendMessage() {
        if (stompClient) {
            var message = {
                content: contentCorrect,
                recipientId: selectedUser.id,
                recipientName: selectedUser.username,
                senderId: AuthService.getCurrentUser().id,
                senderName: AuthService.getCurrentUser().username,
            };
            console.log(allMessages.get(selectedUser.username));
            if (allMessages.get(selectedUser.username)) {
                console.log("я тут1");
                let msg = allMessages.get(selectedUser.username).messages;
                msg.push(message);
                const valueMap = {unRead: -1, messages: msg}
                setAllMessages(prev => (prev.set(selectedUser.username, valueMap)));
            } else {
                console.log("я тут2");
                let msg = [];
                msg.push(message);
                setAllMessages(prev => (prev.set(selectedUser.username, msg)));
            }
            stompClient.send("/app/send/" + selectedUser.username, {}, JSON.stringify(message));
            setContent("");
            setContentCorrect("");
            setContentPresence(false);
            setRefresh({});
            console.log(allMessages);
        }
    }

    function selectUser(user) {
        setSelectedUser(user);
        ChatService.getMessages(AuthService.getCurrentUser().id, user.id)
            .then((response) => {
                // let messages = [];
                // console.log(response.data);
                // (response.data).map((data, index) => (
                //     messages.push({
                //         content: data.content,
                //         recipientId: data.recipientId,
                //         recipientName: data.recipientName,
                //         senderId: data.senderId,
                //         senderName: data.senderName,
                //     })
                // ))
                // console.log(messages)
                const valueMap = {unRead: 0, messages: response.data};
                console.log(response.data);
                if (allMessages.get(user.username)) {
                    const unRead = allMessages.get(user.username).unRead
                    minusUnRead(unRead);
                    console.log(unRead);
                    console.log("hello");
                }
                console.log(number);
                console.log(numberOfUnRead);
                setAllMessages(prev => (prev.set(user.username, valueMap)));
                const oldUsers = users;
                setUsers([]);
                setUsers(oldUsers);
                setRefresh({});
            })
            .catch((e) => {
                console.log(e);
            });
        console.log(allMessages);
    }

    function updateMsg(msg) {
        console.log("я тут");
        if (msg) {
            const newMsg = {...msg, statusMsg: statusMsg.READ}
            console.log(newMsg);
            setAllMessages(prev => (prev.set(newMsg.senderName, newMsg)));
        }
        return undefined;
    }

    return (
        <Grid>
            <Grid xs={12} item className={classes.mainGrid}>
                <Grid xs={3} item>
                    <Card className={classes.paper}>
                        {users &&
                        users.map((user, index) => (
                            <Button
                                className={classes.button}
                                value={user}
                                onClick={() => selectUser(user)}
                                key={index}
                            >
                                <UserCardMessage user={user}
                                                 unRead={allMessages.get(user.username) && allMessages.get(user.username).unRead}/>
                            </Button>

                        ))}
                    </Card>
                </Grid>

                <Grid xs={9} item>
                    <Card className={classes.paper2}>
                        <Grid>
                            <Paper
                                className={classes.messageGrid}>
                                {selectedUser && (allMessages.get(selectedUser.username)) && ([...allMessages.get(selectedUser.username).messages].map((msg, index) => (

                                    ((((msg.senderName !== selectedUser.username) || (msg.senderName === msg.recipientName)) &&
                                        (<Paper className={classes.msgMy} key={index}>
                                            <Grid className={classes.txt}>{msg.senderName}</Grid>
                                            {msg.content}
                                        </Paper>)) || (((msg.senderName === selectedUser.username) &&
                                            (<Paper className={classes.msgNotMy} key={index}>
                                                <Grid className={classes.txt}>{msg.senderName}</Grid>
                                                {msg.content}
                                            </Paper>))
                                        // || (() => {
                                        //     setAllMessages(prev => (prev.set(msg.senderName, {
                                        //         ...msg,
                                        //         statusMsg: statusMsg.READ
                                        //     })))
                                        //     return undefined;
                                        // })

                                    ))

                                )))}
                            </Paper>
                            <TextField
                                className={classes.root}
                                multiline
                                minRows={2}
                                maxRows={6}
                                variant="outlined"
                                fullWidth
                                id="content"
                                label="Напишите сообщение..."
                                name="content"
                                autoComplete="off"
                                value={content}
                                onChange={onChangeMessageContent}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={sendMessage}
                                disabled={(!contentPresence) || (!selectedUser)}
                            >
                                <DoneOutlineIcon/>
                            </Button>
                        </Grid>
                    </Card>
                </Grid>

            </Grid>
        </Grid>
    );
}

export default withStyles(useStyles)(Chat);