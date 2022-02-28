import {Card, Paper, TextField, withStyles} from "@material-ui/core";
import React, {Component, useEffect, useState} from "react";
import UserService from "../services/user.service";
import Grid from "@material-ui/core/Grid";
import AuthService from "../services/auth.service";
import Button from "@material-ui/core/Button";
// import UserCardMessage from "./user-card.component";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
// import {Client} from '@stomp/stompjs';
// import SockJS from 'sockjs-client'
// import {Stomp} from '@stomp/stompjs'
// import {Stomp} from 'stompjs';
// import {StompEventTypes, withStomp} from 'react-stompjs'
// import SockJsClient from 'react-stomp';
// import { TalkBox } from "react-talk";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import UserCardMessage from "./user-card-msg.component";

const useStyles = theme => ({
    root: {
        // width: 635,
        // marginRight: theme.spacing(1),
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
    },
    mainGrid: {
        display: 'flex',
        minWidth: 1000,
    },
    button: {
        width: 220,
        '&:active': {
            backgroundColor: '#bdff59',
            // color: '#fff',
        }
    },
    messageGrid: {
        width: 720,
        height: 440,
    }
});

var stompClient = null;
const API_URL = process.env.REACT_APP_API_URL;

// function ListMsg(props) {
//     const content = props.msg;
//     console.log(content);
//     return (<p>{content}</p>);
// }

function Chat(props) {
    // constructor(props) {
    //     super(props);
    //     this.onChangeMessageContent = this.onChangeMessageContent.bind(this);
    //     this.getUsers = this.getUsers.bind(this);
    //     this.selectUser = this.selectUser.bind(this);
    //     this.connectToChat = this.connectToChat.bind(this);
    //     this.sendMessage = this.sendMessage.bind(this);
    //     this.onError = this.onError.bind(this);
    //     // this.onConnected = this.onConnected.bind(this);
    //     // this.onDisconnect = this.onDisconnect.bind(this);
    //     this.onMessageReceived = this.onMessageReceived.bind(this);
    //     this.setset = this.setset.bind(this);
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [contentPresence, setContentPresence] = useState(false);
    const [contentCorrect, setContentCorrect] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [incomingMessage, setIncomingMessage] = useState(false);
    const [clientConnected, setClientConnected] = useState(false);
    const [users, setUsers] = useState([]);
    const [connected, setConnected] = useState(false);
    // this.state = {
    //         content: "",
    //         contentPresence: false,
    //         contentCorrect: "",
    //         selectedUser: [],
    //         incomingMessage: false,
    //         messages: [],
    //         clientConnected: false,
    //     };
    // }

    useEffect(() => {
        if (!connected) {
            setConnected(true)
            console.log("DAN DAN")
            getUsers();
            connectToChat();
        }
        if (selectedUser != null) {
            getMessages();
        }
    });

    const getMessages =()=>{

    }

    const connectToChat = () => {
        let Sock = new SockJS('http://localhost:7999/api/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const getUsers = () => {
        const {searchString} = ""
        UserService.getAllByUsername(searchString)
            .then((response) => {
                const users = response.data;
                refreshList();
                setUsers(users)
                // this.setState({
                //     users: users,
                // });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    // setset = (data) => {
    //     this.setState({
    //         messages: data,
    //     });
    //
    // }

    const onMessageReceived = (response) => {
        console.log("daniel")
        let data = JSON.parse(response.body);
        receivedMessages.push(data)
        setReceivedMessages(receivedMessages)
        // this.setState({
        //     messages: data,
        // });
        console.log(data)
    }

    const onConnected = () => {
        // setUserData({...userData,"connected": true});
        console.log("hello");
        // setTimeout(() => { console.log("мир"); }, 100);
        console.log("hello");
        // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        // userJoin();
        stompClient.subscribe('/topic/messages/' + AuthService.getCurrentUser().username, onMessageReceived);
        console.log('/topic/messages/' + AuthService.getCurrentUser().username);
        console.log("hello3");
    }

    // function (response) {
    //     let data = JSON.parse(response.body);
    //     console.log(response)
    //     console.log(response.body)
    //     console.log(data)
    //     console.log(data.content)
    //     // if (this.selectedUser === data.senderName) {
    //     // this.setState({
    //     //     messages: data,
    //     // });
    //     this.setset(data);
    //     console.log("state")
    //     // } else {
    //     //     alert("new mes")
    //     // }
    // }


    const onError = (err) => {
        console.log(err);
    };

    // onMessageReceived = (payload) => {
    //     console.log("hello")
    // }


    const refreshList = () => {
        setUsers([])
        // this.setState({
        //     users: [],
        // });
    }

    const componentDidMount = () => {
            // this.getUsers();
            // this.connectToChat()
            // console.log('Component did mount');
            // // The compat mode syntax is totally different, converting to v5 syntax
            // // Client is imported from '@stomp/stompjs'
            // this.client = new Client();
            //
            // this.client.configure({
            //     brokerURL: 'ws://localhost:8081/app/chat/msg',
            //     onConnect: () => {
            //         console.log('onConnect');
            //
            //         // this.client.subscribe('/queue/now', message => {
            //         //     console.log(message);
            //         //     this.setState({serverTime: message.body});
            //         // });
            //
            //         this.client.subscribe('/topic/messages/' + AuthService.getCurrentUser().username, message => {
            //             alert(message.body);
            //         });
            //     },
            //     // Helps during debugging, remove in production
            //     debug: (str) => {
            //         console.log(new Date(), str);
            //     }
            // });
            //
            // this.client.activate();
        }
    ;

    const onChangeMessageContent = (e) => {
        let str = e.target.value
        str = str.replace(/ {2,}/g, ' ').trim();
        str = str.replace(/[\n\r ]{3,}/g, '\n\r\n\r');
        if (str.charCodeAt(0) > 32) {
            setContent(e.target.value)
            setContentCorrect(str)
            setContentPresence(true)
            // this.setState({
            //     content: e.target.value,
            //     contentCorrect: str,
            //     contentPresence: true
            // });
        } else {
            setContent(e.target.value)
            setContentCorrect(str)
            setContentPresence(false)
            // this.setState({
            //     content: e.target.value,
            //     contentCorrect: str,
            //     contentPresence: false
            // });
        }
    }

    const sendMessage = () => {
        // connectToChat()
        console.log(selectedUser.id)
        console.log(selectedUser.id)
        console.log(selectedUser.username)
        const message = {
            senderId: AuthService.getCurrentUser().id,
            recipientId: selectedUser.id,
            senderName: AuthService.getCurrentUser().username,
            recipientName: selectedUser.username,
            content: contentCorrect,
            sendDate: new Date(),
        };
        const msg = stompClient.send("/app/send/" + selectedUser.username, {}, JSON.stringify(message));
        console.log(msg)
        sentMessages.push(message);
        setSentMessages(sentMessages);
        console.log(sentMessages);
        // this.setState({
        //     messages: message
        // })
        // console.log(message)
    }

    const selectUser = (user) => {
        console.log(user)
        setSelectedUser(user)
        // this.setState({
        //     selectedUser: user
        // })
    }


    // onConnected = () => {
    //     console.log("Connected!!")
    // }
    //
    // onDisconnect = () => {
    //     console.log("Disconnected!!")
    // }
    //
    // onMessageReceived = (msg) => {
    //     this.setState({
    //         messages: msg.message
    //     })
    // }

    // onMessageReceive = (msg, topic) => {
    //     this.setState(prevState => ({
    //         messages: [...prevState.messages, msg]
    //     }));
    // }
    //
    // sendMessage = (msg, selfMsg) => {
    //     try {
    //         this.clientRef.sendMessage("/app/message.send/" + this.state.selectedUser.username, JSON.stringify(selfMsg));
    //         return true;
    //     } catch(e) {
    //         return false;
    //     }
    // }

    // render()
    // {
    const {classes} = props;
    console.log(sentMessages)
    // const {messages} = this.state
    // const wsSourceUrl = window.location.protocol + "//" + window.location.host + "/chat/msg";
    // console.log(wsSourceUrl)
    return (
        <Grid>
            {/*<TalkBox topic="react-websocket-template" currentUserId={ AuthService.getCurrentUser().id }*/}
            {/*         currentUser={ AuthService.getCurrentUser().username } messages={ this.state.messages }*/}
            {/*         onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>*/}

            {/*<SockJsClient url={ "/chat/msg" } topics={["/topic/messages/" + AuthService.getCurrentUser().username]}*/}
            {/*              onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}*/}
            {/*              onConnect={ () => { this.setState({ clientConnected: true }) } }*/}
            {/*              onDisconnect={ () => { this.setState({ clientConnected: false }) } }*/}
            {/*              debug={ false }/>*/}
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
                                <UserCardMessage user={user}/>
                            </Button>
                        ))}
                    </Card>
                </Grid>

                <Grid xs={9} item>
                    <Card className={classes.paper2}>
                        <Grid className={classes.grid}>
                            <Paper className={classes.messageGrid}>
                                <Grid>
                                    <Paper>
                                        {/*{sentMessages.map((sntMsg) =>*/}
                                        {/*    (<li><p>sntMsg</p></li>)*/}
                                        {/*)}*/}
                                        {/*{sentMessages.content}*/}
                                        {/*{sentMessages.map((msg) => (*/}
                                        {/*    // <li>*/}
                                        {/*        <p>{msg.content}</p>*/}
                                        {/*    // </li>*/}
                                        {/*))}*/}
                                        {sentMessages.map((msg) =>
                                            <p key={msg.senderId}>{msg.content}</p>
                                        )}
                                        HELLO
                                    </Paper>
                                </Grid>
                            </Paper>
                            <TextField
                                className={classes.root}
                                multiline
                                minRows={2}
                                maxRows={10}
                                variant="outlined"
                                fullWidth
                                id="content"
                                label="Оставьте отзыв..."
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
                                // className={classes.submit}
                                disabled={!contentPresence}
                            >
                                <DoneOutlineIcon/>
                            </Button>
                        </Grid>
                    </Card>
                </Grid>

            </Grid>
        </Grid>
    );
    // }
}

export default withStyles(useStyles)(Chat)