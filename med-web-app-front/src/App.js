import React, {useEffect, useState} from "react"
import {Switch, Route, Link, Redirect} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Home from "./components/main/home.component"
import HomePatient from "./components/main/home-patient.component"
import HomeDoctor from "./components/main/home-doctor.component"
import Profile from "./components/user_profile/profile.component"
import Search from "./components/search/search.component"
import ViewAttachmentsComponent from "./components/attachments/view-attachments.component"
import UploadAttachmentsComponent from "./components/attachments/upload-attachments.component"
import PipelinesComponent from "./components/pipelines/pipelines.component"
import PipelineResultsComponent from "./components/pipelines/pipeline-results.component"
import ViewRecordsComponent from "./components/records/view-records.component"
import CreateRecordComponent from "./components/records/create-record.component"
import RecordThreadComponent from "./components/records/record-thread.component"
import SavePipelineConfigComponent from "./components/pipelines/save-pipeline-config.component"
import TopicComponent from "./components/records/topic.component"
import Register from "./components/signin_signup/register.component"
import Login from "./components/signin_signup/login.component"
import NotExist from "./components/not-exist.component"
import AuthService from "./services/auth.service"
import {
    AppBar,
    Badge,
    CssBaseline,
    Divider, Drawer, Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon, ListItemText, Paper,
    Toolbar, withStyles
} from "@material-ui/core"
import clsx from "clsx"
import MenuIcon from "@material-ui/icons/Menu"
import Typography from "@material-ui/core/Typography"
import NotificationsIcon from "@material-ui/icons/Notifications"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import HomeIcon from '@material-ui/icons/Home'
import BallotIcon from '@material-ui/icons/Ballot'
import ForumIcon from '@material-ui/icons/Forum'
import SearchIcon from '@material-ui/icons/Search'
import MessageIcon from '@material-ui/icons/Message'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import Chat from "./components/messenger/chat.component"
import SockJS from "sockjs-client"
import {over} from "stompjs"
import UserService from "./services/user.service"
import ChatService from "./services/chat.service"

const drawerWidth = 240

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        whiteSpace: 'nowrap',
        width: theme.spacing(32),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        height: "100%",
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // maxWidth: 60,
        width: theme.spacing(7),
        // [theme.breakpoints.up('sm')]: {
        //     width: theme.spacing(9),
        // },
        height: "100%",
    },
    leftIndent: {
        width: 60,
    },
    leftIndentOpen: {
        width: 240,
    },
    active: {
        background: '#f4f4f4'
    },
    title: {
        flexGrow: 1,
        width: '100%',
    },
    appBar: {
        top: 0,
        left: 0,
        minWidth: 600,
        minHeigft: 64,
        maxHeight: 64,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    appBarSpacer2: {
        marginTop: 10,
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
    },
    contentClose: {
        // width: '100%',
        //marginLeft: '100px'
    },
    noticeMsg: {
        backgroundColor: '#FF0040',
        textAlign: 'center',
        color: 'white'
        // width: '100%',
        //marginLeft: '100px'
    },
})
let stompClient = null;

function App(props) {
    const {classes} = props
    const [numberOfUnRead, setNumberOfUnRead] = useState(0)
    // const [showModeratorBoard, setShowModeratorBoard] = useState(false)
    // const [showAdminBoard, setShowAdminBoard] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [open, setOpen] = useState(true)
    const [refresh, setRefresh] = useState({})
    const [allMessages, setAllMessages] = useState(new Map())
    const [usersWithLastMsgReceived, setUsersWithLastMsgReceived] = useState(new Map())

    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (user) {
            AuthService.checkTokenIsExpired(user.token)
                .then(() => {
                    setCurrentUser(user)
                })
                .catch(error => {
                        logOut()
                    }
                )
            connectToChat()
            getUnreadMessages()
        }
        return () => {
            stompClient.unsubscribe()
        }
    }, [])

    function getUnreadMessages() {
        ChatService.getUnreadMessages(AuthService.getCurrentUser().id)
            .then((response) => {
                if (response.data.length > 0) {
                    for (let index = 0; index < response.data.length; index++) {
                        if (allMessages.get(response.data[index].senderName)) {
                            let list = allMessages.get(response.data[index].senderName).messages
                            list.push(response.data[index])
                            const unRead = allMessages.get(response.data[index].senderName).unRead
                            const valueMap = {unRead: unRead + 1, messages: list}
                            setAllMessages(prev => (prev.set(response.data[index].senderName, valueMap)))
                        } else {
                            let list = []
                            list.push(response.data[index])
                            const valueMap = {unRead: 1, messages: list}
                            setAllMessages(prev => (prev.set(response.data[index].senderName, valueMap)))
                        }
                    }
                    setNumberOfUnRead(response.data.length)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    function onMessageReceived(response) {
        let data = JSON.parse(response.body)
        let presenceUserInContacts = false
        let presenceUsername
        for (let username of usersWithLastMsgReceived.keys()) {
            if (username === data.senderName) {
                presenceUserInContacts = true
                presenceUsername = username
                break
            }
        }
        if (presenceUserInContacts) {
            const userWithLastMessage = usersWithLastMsgReceived.get(presenceUsername)
            userWithLastMessage.second = data
            setUsersWithLastMsgReceived(prev => prev.set(presenceUsername, userWithLastMessage))
        } else {
            UserService.getAllByUsername(data.senderName)
                .then(async (response) => {
                    const user = response.data.shift();
                    if (user.avatar) {
                        const base64Response = await fetch(`data:application/json;base64,${user.avatar}`)
                        const blob = await base64Response.blob()
                        user.avatar = URL.createObjectURL(blob)
                    }
                    let userWithLastMsg = {first: user, second: data}
                    setUsersWithLastMsgReceived(prev => (prev.set(user.username, userWithLastMsg)))
                    setRefresh({})
                })
                .catch((e) => {
                    console.log(e);
                })
        }
        if (allMessages.get(data.senderName)) {
            let list = allMessages.get(data.senderName).messages
            const unRead = allMessages.get(data.senderName).unRead
            list.push(data)
            const valueMap = {unRead: unRead + 1, messages: list}
            setAllMessages(prev => (prev.set(data.senderName, valueMap)))
            setNumberOfUnRead(prev => (prev + 1))
        } else {
            let list = []
            list.push(data)
            const valueMap = {unRead: 1, messages: list}
            setAllMessages(prev => (prev.set(data.senderName, valueMap)))
            setNumberOfUnRead(prev => (prev + 1))
            setRefresh({})
        }
    }

    function connectToChat() {
        let Sock = new SockJS('http://localhost:7999/api/ws')
        stompClient = over(Sock)
        stompClient.connect({}, onConnected, onError)
    }

    function onConnected() {
        stompClient.subscribe('/topic/' + AuthService.getCurrentUser().username + '/private', onMessageReceived)
    }

    function onError(err) {
        console.log(err)
    }

    function handleDrawerOpen() {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }

    function handleDrawerChange() {
        setOpen(!open)
    }

    function logOut() {
        AuthService.logout(AuthService.getCurrentUser().username)
        setCurrentUser(null)
        // this.setState({currentUser: null})
    }

    /*displayPageContent(path) {
        console.log(path)
        this.props.history.push({
            pathname: path,
        })
        window.location.reload()
    }*/

    function getPathForProfile() {
        const currentUser = AuthService.getCurrentUser()
        if (currentUser)
            return "/profile/" + currentUser.username
        else
            return null
    }

    function checkCurrentUser(component) {
        const currentUser = AuthService.getCurrentUser()
        if (currentUser) {
            return component
        } else {
            return <Redirect to="/login"/>
        }
    }

    function minusUnRead(num) {
        setNumberOfUnRead(prev => (prev - num))
    }


    const menuItemsForUnregisteredUsers = [
        {
            text: 'Главная',
            icon: <HomeIcon color="secondary"/>,
            path: '/home'
        },
        {
            text: 'Посты',
            icon: <ForumIcon color="secondary"/>,
            path: '/records/view'
        },
    ]
    const menuItemsForRegisteredUsers = [
        {
            text: 'Главная',
            icon: <HomeIcon color="secondary"/>,
            path: '/home'
        },
        {
            text: 'Анализ снимков',
            icon: <BallotIcon color="secondary"/>,
            path: '/pipelines/create'
        },
        {
            text: 'Форум',
            icon: <ForumIcon color="secondary"/>,
            path: '/records/view'
        },
        {
            text: 'Поиск',
            icon: <SearchIcon color="secondary"/>,
            path: '/search'
        },
        {
            text: 'Сообщения',
            icon: <MessageIcon color="secondary"/>,
            path: '/msg',
            numberOfUnRead: numberOfUnRead,
            numberMsg: <Paper
                className={classes.noticeMsg}>{
                (numberOfUnRead !== 0 && numberOfUnRead < 999 && numberOfUnRead)
                ||
                (numberOfUnRead !== 0 && numberOfUnRead >= 999 && "999+")}
            </Paper>,
        },
    ]

    return (
        <div className={classes.root}>
            <CssBaseline/>

            <AppBar position="fixed" className={clsx(classes.appBar, false && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerChange}
                        className={clsx(classes.menuButton, false && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Medical web app
                    </Typography>

                    {currentUser && (
                        <Grid container>
                            <Grid item xs/>
                            <Grid item width={'50px'}>
                                <IconButton color="inherit">
                                    <Badge badgeContent={4} color="secondary">
                                        <NotificationsIcon/>
                                    </Badge>
                                </IconButton>
                            </Grid>
                            <Grid item width={'130px'}>
                                <ListItem
                                    button
                                    component={Link} to={getPathForProfile()}>
                                    <AccountCircleRoundedIcon/>
                                    <ListItemText primary={currentUser.username}/>
                                </ListItem>
                            </Grid>

                            <Grid item width={'90px'}>
                                <ListItem
                                    button
                                    component={Link} to={"/login"}
                                    onClick={logOut}>
                                    <ListItemText primary={"Выйти"}/>
                                </ListItem>
                            </Grid>
                        </Grid>
                    )}
                    {!currentUser && (
                        <Grid container>
                            <Grid item xs/>
                            <Grid item>
                                <ListItem
                                    button
                                    component={Link} to={"/login"}>
                                    <ListItemText primary={"Войти"}/>
                                </ListItem>
                            </Grid>
                            <Grid item>
                                <ListItem
                                    button
                                    component={Link} to={"/register"}>
                                    <ListItemText primary={"Зарегистрироваться"}/>
                                </ListItem>
                            </Grid>
                        </Grid>
                    )}
                </Toolbar>
            </AppBar>

            <Grid container>
                <Grid item className={clsx(classes.leftIndent, open && classes.leftIndentOpen)}>
                    <Drawer
                        height="100%"
                        variant="permanent"
                        classes={{
                            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                        }}
                        open={open}
                    >
                        {open && (<div className={classes.toolbarIcon}>
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>)}
                        {!open && (<div className={classes.toolbarIcon}>
                            <IconButton onClick={handleDrawerOpen}>
                                <ChevronRightRoundedIcon/>
                            </IconButton>
                        </div>)}
                        <Divider/>
                        <List>
                            {currentUser && (
                                menuItemsForRegisteredUsers.map((item) => (
                                    <ListItem
                                        button
                                        key={item.text}
                                        component={Link} to={item.path}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text}/>
                                        <ListItemText primary={item.numberMsg}/>
                                    </ListItem>
                                )))
                            }
                            {!currentUser && (
                                menuItemsForUnregisteredUsers.map((item) => (
                                    <ListItem
                                        button
                                        key={item.text}
                                        //onClick={() => this.displayPageContent(item.path)}
                                        component={Link} to={item.path}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text}/>
                                    </ListItem>
                                )))
                            }
                        </List>
                    </Drawer>
                </Grid>
                <Grid item xs className={clsx(classes.content, !open && classes.contentClose)}>
                    <div className={classes.appBarSpacer}/>
                    <div className={classes.appBarSpacer2}/>
                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home}/>
                            <Route exact path="/home/patient" component={HomePatient}/>
                            <Route exact path="/home/doctor" component={HomeDoctor}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path={["/msg", "/msg/:selected"]}>
                                {((AuthService.getCurrentUser())) ?
                                    (<Chat stompClient={stompClient} allMessages={allMessages}
                                           setAllMessages={setAllMessages}
                                           number={numberOfUnRead} minusUnRead={minusUnRead}
                                           usersWithLastMsg={usersWithLastMsgReceived}
                                           setUsersWithLastMsg={setUsersWithLastMsgReceived}
                                    />) : (<Redirect to="/login"/>)}
                            </Route>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/search">
                                {AuthService.getCurrentUser() ? <Search/> : <Redirect to="/login"/>}
                            </Route>
                            <Route exact path={["/profile/:usernamePath"]}>
                                {AuthService.getCurrentUser() ? <Profile/> : <Redirect to="/login"/>}
                            </Route>
                            <Route exact path="/pipelines/create" component={PipelinesComponent}>
                                {AuthService.getCurrentUser() ? <PipelinesComponent/> : <Redirect to="/login"/>}
                            </Route>
                            <Route exact path="/pipelines/results" component={PipelineResultsComponent}>
                                {AuthService.getCurrentUser() ? <PipelineResultsComponent/> : <Redirect to="/login"/>}
                            </Route>
                            <Route exact path="/pipelines/save" component={SavePipelineConfigComponent}>
                                {AuthService.getCurrentUser() ? <SavePipelineConfigComponent/> :
                                    <Redirect to="/login"/>}
                            </Route>
                            <Route exact path="/files/view" component={ViewAttachmentsComponent}>
                                {AuthService.getCurrentUser() ? <ViewAttachmentsComponent/> : <Redirect to="/login"/>}
                            </Route>
                            <Route exact path="/files/upload" component={UploadAttachmentsComponent}>
                                {AuthService.getCurrentUser() ? <UploadAttachmentsComponent/> : <Redirect to="/login"/>}
                            </Route>
                            <Route exact path="/records/view" component={ViewRecordsComponent}/>
                            <Route exact path="/records/create" component={CreateRecordComponent}/>
                            <Route path="/records/thread/:recordId" component={RecordThreadComponent}/>
                            <Route exact path="/topics/create" component={TopicComponent}>
                                {AuthService.getCurrentUser() ? <TopicComponent/> : <Redirect to="/login"/>}
                            </Route>
                            <Route component={NotExist}/>
                        </Switch>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(useStyles)(App)