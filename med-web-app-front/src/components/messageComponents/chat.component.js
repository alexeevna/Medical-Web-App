import {Card, Divider, List, Paper, TextField, withStyles} from "@material-ui/core"
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react"
import UserService from "../../services/user.service"
import Grid from "@material-ui/core/Grid"
import AuthService from "../../services/auth.service"
import Button from "@material-ui/core/Button"
import DoneOutlineIcon from "@material-ui/icons/DoneOutline"
import ListItemButton from '@mui/material/ListItemButton';
// import { Stomp } from '@stomp/stompjs'
import UserCardMessage from "./user-card-msg.component"
import ChatService from "../../services/chat.service"
import RecipientMsg from "./recipient.msg.component"
import SenderMsg from "./sender.msg.component"
import UpdateStatusMsg from "./updateStatusMsg.component";
import {useLocation, useParams} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";


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
        marginLeft: theme.spacing(-7),
        // width:200,
        // padding: theme.spacing(3),
        // marginLeft: theme.spacing(1),
        // padding: theme.spacing(1),
        color: "black",
        overflowY: "auto",
        // display: 'flex',
        height: 623,
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
        marginTop: theme.spacing(-2),
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
        // overflowX: "visible",
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
    noticeMsg: {
        // marginLeft: theme.spacing(15),
        backgroundColor: '#FF0040',
        textAlign: 'center',
        color: 'white',
        width: 25
    },
    itemButton: {
        padding: 0,
        // '& .MuiListItemButton-root.Mui-selected': {
        //     backgroundColor: '#FF0040',
        // },
        // '& .MuiListItemButton-root.css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root': {
        //     "&:hover": {
        //         backgroundColor: 'primary',
        //     },
        // },
    },
    usersGrid: {
        height: 440,
        overflowY: "auto",
        // overflowX: "visible",
        marginBottom: theme.spacing(1.5),
    },
    active: {
        backgroundColor: '#FF0040',
    },
    avatar: {
        width: 45,
        height: 45,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(-1),
    },
    flex: {
        display: 'flex',
        // alignItems: 'stretch',
        // position: 'auto',
    },
    lastMsgTimeContent: {
        color: '#888888'
    },
    gridFullWidth: {
        width: '100%'
    }
})

var stompClient = null
const API_URL = process.env.REACT_APP_API_URL

function Chat(props) {
    const {classes} = props
    const {stompClient} = props
    const {minusUnRead} = props
    const {usersWithLastMsg} = props
    const {setUsersWithLastMsg} = props
    const {allMessages} = props
    const {setAllMessages} = props
    const {selected} = useParams()
    const [processedUnreadMessages, setProcessedUnreadMessages] = useState([])
    const [content, setContent] = useState("")
    const [contentPresence, setContentPresence] = useState(false)
    const [contentCorrect, setContentCorrect] = useState("")
    const [selectedUser, setSelectedUser] = useState(null)
    const [refresh, setRefresh] = useState({})
    const messagesEndRef = useRef(null)

    useEffect(() => {
        getContacts();
    }, [])

    function updateContacts() {
        UserService.pushContacts(AuthService.getCurrentUser().username, selected)
            .then((response) => {
                console.log(response.data)
                let userWithLastMsg = {first: response.data, second: null}
                console.log(userWithLastMsg)
                setUsersWithLastMsg(prev => prev.set(response.data.username, userWithLastMsg))
                selectUser(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    const goToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "auto"})
    }

    function getContacts() {
        UserService.getContacts(AuthService.getCurrentUser().username)
            .then((response) => {
                const userWithLastMsgArray = response.data.contactWithLastMsg
                userWithLastMsgArray.map(user => {
                    setUsersWithLastMsg(prev => prev.set(user.first.username, user))
                })
                const user = userWithLastMsgArray.find(user => user.first.username === selected)
                if (selected && !user) {
                    updateContacts();
                } else if (selected && user) {
                    selectUser(user.first)
                }
                // This state update is artificial, for forced rendering contacts list.
                setRefresh({})
            })
            .catch((e) => {
                console.log(e)
            })
    }

    function onChangeMessageContent(e) {
        let str = e.target.value
        str = str.replace(/ {2,}/g, ' ').trim()
        str = str.replace(/[\n\r ]{3,}/g, '\n\r\n\r')
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
                sendDate: new Date()
            }
            if (allMessages.get(selectedUser.username)) {
                let msg = allMessages.get(selectedUser.username).messages
                msg.push(message)
                const valueMap = {unRead: 0, messages: msg}
                setAllMessages(prev => (prev.set(selectedUser.username, valueMap)))
            } else {
                let msg = []
                msg.push(message)
                const valueMap = {unRead: 0, messages: msg}
                setAllMessages(prev => (prev.set(selectedUser.username, valueMap)))
            }
            setUsersWithLastMsg(prev => prev.set(selectedUser.username, {first: selectedUser, second: message}))
            stompClient.send("/app/send/" + selectedUser.username, {}, JSON.stringify(message))
            setContent("")
            setContentCorrect("")
            setContentPresence(false)
        }
    }

    function selectUser(user) {
        setSelectedUser(user)
        ChatService.getMessages(AuthService.getCurrentUser().username, user.username)
            .then((response) => {
                if (response.data.length > 0) {
                    const valueMap = {unRead: 0, messages: response.data}
                    setAllMessages(prev => (prev.set(user.username, valueMap)))
                    setRefresh({})
                    goToBottom()
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    function sortContacts(){
        let sortedContacts = [...usersWithLastMsg.values()]
        sortedContacts.sort(function (a, b) {
            const aTime = new Date(a.second.sendDate)
            const bTime = new Date(b.second.sendDate)
            if (aTime > bTime) {
                return -1
            }
            if (aTime < bTime) {
                return 1
            }
            return 0
        })
        console.log(sortedContacts)
        return (sortedContacts.map((userAndLastMsg, index) => (
            <Grid key={index}>
                <Link onClick={() => selectUser(userAndLastMsg.first)}
                      to={"/msg/" + userAndLastMsg.first.username}
                      style={{textDecoration: 'none'}}>
                    <ListItemButton
                        value={userAndLastMsg.first}
                        selected={selectedUser && selectedUser.username === userAndLastMsg.first.username}
                    >
                        <Grid className={classes.flex} xs={12} item>
                            <Grid xs={2} item>
                                <Avatar className={classes.avatar}>
                                    2
                                </Avatar>
                            </Grid>
                            <Grid xs={10} item>
                                <Grid className={classes.gridFullWidth}>
                                    <Grid className={classes.flex} xs={12} item>
                                        <Grid xs={10} item>
                                            <UserCardMessage user={userAndLastMsg.first}
                                            />
                                        </Grid>
                                        <Grid xs={2} item>
                                            <Grid className={classes.lastMsgTimeContent}>
                                                {
                                                    userAndLastMsg.second && new Date(userAndLastMsg.second.sendDate).getHours() + ":"
                                                    + ((new Date(userAndLastMsg.second.sendDate).getMinutes() < 10 && "0" + new Date(userAndLastMsg.second.sendDate).getMinutes())
                                                        || (new Date(userAndLastMsg.second.sendDate).getMinutes() > 10 && new Date(userAndLastMsg.second.sendDate).getMinutes())
                                                    )
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className={classes.flex} xs={12} item>
                                    <Grid xs={10} item
                                          className={classes.lastMsgTimeContent}>{(userAndLastMsg.second && userAndLastMsg.second.content && userAndLastMsg.second.content.length > 25 && userAndLastMsg.second.content.slice(0, 25) + "...") ||
                                    (userAndLastMsg.second && userAndLastMsg.second.content && userAndLastMsg.second.content.length < 25 && userAndLastMsg.second.content)}
                                    </Grid>
                                    {allMessages.get(userAndLastMsg.first.username) && (allMessages.get(userAndLastMsg.first.username).unRead > 0)
                                    && <Grid>
                                        <Paper
                                            className={classes.noticeMsg}>{allMessages.get(userAndLastMsg.first.username).unRead}
                                        </Paper>
                                    </Grid>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                    <Divider/>
                </Link>
            </Grid>
        )))
    }

    function updateStatusMsg() {
        //Сюда заходить очень часто во время отображения сообщений, надо бы оптимизировать
        const dataMsg = allMessages.get(selectedUser.username)
        scrollToBottom()
        if (dataMsg && dataMsg.unRead > 0) {
            const unreadArr = dataMsg.messages.filter(msg => msg.statusMessage === "UNREAD" && msg.senderName === selectedUser.username && !processedUnreadMessages.includes(msg.id))
            console.log(unreadArr)
            if (unreadArr.length > 0) {
                unreadArr.map(msg => setProcessedUnreadMessages(prevState => (prevState.concat([msg.id]))))
                ChatService.updateStatusUnreadMessages(unreadArr).then()
            }
            minusUnRead(dataMsg.unRead)
            dataMsg.unRead = 0
            setAllMessages(prev => (prev.set(selectedUser.username, dataMsg)))
        }
    }

    return (
        <Grid xs={12} item className={classes.mainGrid}>
            <Grid xs={3} item>
                <Card className={classes.paper}>
                    <List className={classes.itemButton}>

                        {usersWithLastMsg && sortContacts()
                        }
                    </List>
                </Card>
            </Grid>

            <Grid xs={9} item>
                <Card className={classes.paper2}>
                    <Grid>
                        <Paper

                            className={classes.messageGrid}>
                            <Grid>

                                {selectedUser && (allMessages.get(selectedUser.username)) && ([...allMessages.get(selectedUser.username).messages].map((msg, index) => (

                                    ((((msg.senderName !== selectedUser.username) || (msg.senderName === msg.recipientName)) &&
                                        (
                                            <SenderMsg msg={msg} key={index} scrollToBottom={scrollToBottom}/>
                                        )) || (((msg.senderName === selectedUser.username) &&
                                            (
                                                <RecipientMsg msg={msg} key={index}
                                                              initialsSender={selectedUser.initials}
                                                              updateStatusMsg={updateStatusMsg}/>
                                            ))
                                    ))

                                )))
                                }
                            </Grid>
                            <div ref={messagesEndRef}/>
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

    )
}

export default withStyles(useStyles)(Chat)