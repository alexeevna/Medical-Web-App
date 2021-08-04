import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../styles/Profile.css'
import Review from "./review.component"
import {Card, CardContent, CssBaseline, TextField, withStyles} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = theme => ({
    txtField: {
        width: 320,
        margin: theme.spacing(1),
        "& .MuiInputBase-input": {
            textAlign: 'center'
        }
    },
    txtFieldUsername: {
        width: 250,
        margin: theme.spacing(1),
        "& .MuiInputBase-input": {
            textAlign: 'center'
        }
    },
    txtFieldRole: {
        width: 180,
        margin: theme.spacing(1),
        "& .MuiInputBase-input": {
            textAlign: 'center'
        }
    },
    paper: {
        // width: 700,
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        color: "black",
        display: 'flex',
    },
    avatar: {
        width: 130,
        height: 130,
        marginBottom: theme.spacing(3),
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(4),
    },
    div: {
        width: 100,
        height: 100,
        marginRight: 0,
    },
    grid: {
        margin: theme.spacing(1),
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
    }
});

class Profile extends Component {
    constructor(props) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.getUsername = this.getUsername.bind(this);

        this.state = {
            user: null,
            username: this.props.match.params.username,
            showReviews: true,
        };
    }

    getUser(username1) {
        ProfileService.getProfile(username1).then(
            response => {
                const user = response.data;
                this.refreshList();
                this.setState({
                    user: user,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        this.setState({
            user: null,
        });
    }

    getUsername(prevState, props) {
        return {
            username: props.match.params.username,
        };
    }

    setNewUsername() {
        this.setState(this.getUsername);
    }

    componentDidMount() {
        this.setNewUsername();
        this.getUser(this.props.match.params.username);
    }

    render() {
        if (this.props.match.params.username !== this.state.username) {
            this.setNewUsername();
            this.getUser(this.props.match.params.username);
        }
        const {user} = this.state;
        console.log(user)
        const {showReviews} = this.state;
        const {classes} = this.props;
        return (
            <div>
                <CssBaseline/>
                <Grid container spacing={3}>
                    {
                        user &&
                        <Grid xs={12} className={classes.paper}>
                            <Grid xs={8}>
                                <Card className={classes.paper}>
                                    <Grid className={classes.grid}>
                                        <Avatar className={classes.avatar}>
                                            Photo
                                        </Avatar>
                                        <div>Дата регистрации:</div>
                                        <div>{new Date(user.registeredDate).toLocaleDateString()}</div>
                                    </Grid>
                                    <Grid className={classes.grid}>
                                        <TextField
                                            multiline
                                            className={classes.txtField}
                                            id="standard-read-only-input"
                                            maxRows={4}
                                            defaultValue={user.initials}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        <TextField
                                            multiline
                                            className={classes.txtFieldUsername}
                                            id="standard-read-only-input"
                                            maxRows={4}
                                            defaultValue={user.username}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        <TextField
                                            className={classes.txtFieldRole}
                                            id="standard-read-only-input"
                                            defaultValue={user.role}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Card>
                            </Grid>
                            {user && user.username === AuthService.getCurrentUser().username &&
                            <Grid xs={4}>
                                <Card className={classes.paper}>
                                    <div>
                                        <Link to={"/files/view"} className="nav-link card-link-custom color-orange">
                                            Мои файлы
                                        </Link>
                                        <Link to={"/files/upload"} className="nav-link card-link-custom color-orange">
                                            Загрузить файл
                                        </Link>
                                    </div>
                                </Card>
                            </Grid>
                            }
                        </Grid>
                    }
                    {/*{showReviews && (*/}
                    {/*    <Review targetId={user.id}/>*/}
                    {/*)}*/}
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Profile)