import React, {Component} from "react";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";
import Grid from '@material-ui/core/Grid';
import '../styles/Profile.css'
import Review from "./review.component"
import {ButtonBase, Card, TextField, withStyles} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";

const useStyles = theme => ({
    txtField: {
        width: 350,
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
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        padding: theme.spacing(1),
        color: "black",
        // display: 'flex',
    },
    paper2: {
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        color: "black",
    },
    mainGrid: {
        display: 'flex',
        minWidth: 1000,
    },
    avatar: {
        width: 130,
        height: 130,
        marginBottom: theme.spacing(3),
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(4),
    },
    button: {
        width: 200,
        margin: theme.spacing(1),
        backgroundColor: '#f50057',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#ff5983',
            color: '#fff',
        }
    },
    grid: {
        margin: theme.spacing(1),
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
    gridData: {
        marginLeft: theme.spacing(8),
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
    gridInPaper: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        padding: theme.spacing(1),
        color: "black",
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
        console.log(this.props.match.params.username)
        const {user} = this.state;
        const {showReviews} = this.state;
        const {classes} = this.props;
        return (
            <div>
                {
                    user &&
                    <Grid>
                        <Grid xs={12} item className={classes.mainGrid}>
                            <Grid xs={8} item>
                                <Card className={classes.paper}>
                                    <Grid className={classes.gridInPaper}>
                                        <Grid className={classes.grid}>
                                            <ButtonBase>
                                                <Avatar className={classes.avatar}>
                                                    Photo
                                                </Avatar>
                                            </ButtonBase>
                                            <div>Дата регистрации:</div>
                                            <div>{new Date(user.registeredDate).toLocaleDateString()}</div>
                                        </Grid>
                                        <Grid className={classes.gridData}>
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
                                    </Grid>
                                </Card>
                            </Grid>
                            {user && user.username === AuthService.getCurrentUser().username &&
                            <Grid xs={4} item>
                                <Card className={classes.paper2}>
                                    <Grid className={classes.grid}>
                                        <Button variant="contained" href="/files/view" className={classes.button}>
                                            Мои файлы
                                        </Button>
                                        <Button variant="contained" href="/files/upload" className={classes.button}>
                                            Загрузить файл
                                        </Button>
                                    </Grid>
                                </Card>
                            </Grid>
                            }
                        </Grid>

                        {showReviews && (
                            <Review targetId={user.id}/>
                        )}
                    </Grid>
                }
            </div>
        );
    }

}

export default withStyles(useStyles)(Profile)