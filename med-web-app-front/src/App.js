import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {Client} from '@stomp/stompjs';

import Home from "./components/home.component";
import HomePatient from "./components/home-patient.component";
import HomeDoctor from "./components/home-doctor.component";
import Profile from "./components/profile.component";
import Search from "./components/search.component";
import ViewAttachmentsComponent from "./components/view-attachments.component";
import UploadAttachmentsComponent from "./components/upload-attachments.component";
import PipelinesComponent from "./components/pipelines.component";
import PipelineResultsComponent from "./components/pipeline-results.component";
import ViewRecordsComponent from "./components/view-records.component";
import CreateRecordComponent from "./components/create-record.component";
import RecordThreadComponent from "./components/record-thread.component";
import SavePipelineConfigComponent from "./components/save-pipeline-config.component";
import TopicComponent from "./components/topic.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import NotExist from "./components/not-exist.component";
import AuthService from "./services/auth.service";
import {
    AppBar,
    Badge,
    CssBaseline,
    Divider, Drawer, Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    Toolbar, withStyles
} from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import HomeIcon from '@material-ui/icons/Home';
import BallotIcon from '@material-ui/icons/Ballot';
import ForumIcon from '@material-ui/icons/Forum';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        whiteSpace: 'nowrap',
        width: drawerWidth,
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
        maxWidth: 60,
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
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
})

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        //this.displayPageContent = this.displayPageContent.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            open: true,

        };
    }

    handleDrawerOpen = () => {
        this.setState({
            open: true
        })
    };

    handleDrawerClose = () => {
        this.setState({
            open: false
        })
    };

    componentDidMount() {


        console.log('Component did mount');
        // The compat mode syntax is totally different, converting to v5 syntax
        // Client is imported from '@stomp/stompjs'
        this.client = new Client();

        this.client.configure({
            brokerURL: 'ws://medicalWebApp/chat/msg',
            onConnect: () => {
                console.log('onConnect');

                // this.client.subscribe('/queue/now', message => {
                // console.log(message);
                // this.setState({serverTime: message.body});
                // });

                this.client.subscribe('/topic/messages/' + AuthService.getCurrentUser().username, message => {
                    alert(message.body);
                });
            },
            // Helps during debugging, remove in production
            debug: (str) => {
                console.log(new Date(), str);
            }
        });

        this.client.activate();


        const user = AuthService.getCurrentUser();

        if (user) {
            AuthService.checkTokenIsExpired(user.token)
                .then(response => {
                    this.setState({
                        currentUser: user
                    });
                })
                .catch(error => {
                        this.logOut();
                    }
                )
        }
    }

    logOut() {
        AuthService.logout();
        this.setState({currentUser: null});
    }

    /*displayPageContent(path) {
        console.log(path);
        this.props.history.push({
            pathname: path,
        });
        window.location.reload();
    }*/

    getPathForProfile() {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser)
            return "/profile/" + currentUser.username
        else
            return null;
    }

    render() {
        const {classes} = this.props;
        const {currentUser} = this.state;

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
        ];
        const menuItemsForRegisteredUsers = [
            {
                text: 'Главная',
                icon: <HomeIcon color="secondary"/>,
                path: '/home'
            },
            {
                text: 'Анализ ИИ',
                icon: <BallotIcon color="secondary"/>,
                path: '/pipelines/create'
            },
            {
                text: 'Посты',
                icon: <ForumIcon color="secondary"/>,
                path: '/records/view'
            },
            {
                text: 'Поиск',
                icon: <SearchIcon color="secondary"/>,
                path: '/search'
            },
        ];

        return (
            <div className={classes.root}>
                <CssBaseline/>

                <AppBar position="fixed" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
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
                                        component={Link} to={this.getPathForProfile()}>
                                        <AccountCircleRoundedIcon/>
                                        <ListItemText primary={currentUser.username}/>
                                    </ListItem>
                                </Grid>

                                <Grid item width={'90px'}>
                                    <ListItem
                                        button
                                        component={Link} to={"/login"}
                                        onClick={this.logOut}>
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
                    <Grid item className={clsx(classes.leftIndent, this.state.open && classes.leftIndentOpen)}>
                        <Drawer
                            height="100%"
                            variant="permanent"
                            classes={{
                                paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                            }}
                            open={this.state.open}
                        >
                            {this.state.open && (<div className={classes.toolbarIcon}>
                                <IconButton onClick={this.handleDrawerClose}>
                                    <ChevronLeftIcon/>
                                </IconButton>
                            </div>)}
                            {!this.state.open && (<div className={classes.toolbarIcon}>
                                <IconButton onClick={this.handleDrawerOpen}>
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
                    <Grid item xs className={clsx(classes.content, !this.state.open && classes.contentClose)}>
                        <div className={classes.appBarSpacer}/>
                        <div className={classes.appBarSpacer2}/>
                        <div className="container mt-3">
                            <Switch>
                                <Route exact path={["/", "/home"]} component={Home}/>
                                <Route exact path="/home/patient" component={HomePatient}/>
                                <Route exact path="/home/doctor" component={HomeDoctor}/>                             }
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <Route exact path="/search" component={Search}/>
                                <Route exact path="/profile/:username" component={Profile}/>
                                <Route exact path="/pipelines/create" component={PipelinesComponent}/>
                                <Route exact path="/pipelines/results" component={PipelineResultsComponent}/>
                                <Route exact path="/pipelines/save" component={SavePipelineConfigComponent}/>
                                <Route exact path="/files/view" component={ViewAttachmentsComponent}/>
                                <Route exact path="/files/upload" component={UploadAttachmentsComponent}/>
                                <Route exact path="/records/view" component={ViewRecordsComponent}/>
                                <Route exact path="/records/create" component={CreateRecordComponent}/>
                                <Route path="/records/thread/:recordId" component={RecordThreadComponent}/>
                                <Route exact path="/topics/create" component={TopicComponent}/>
                                <Route component={NotExist}/>
                            </Switch>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(App)