import React, {Component} from "react";
import AuthService from "../../services/auth.service";
import AttachmentService from "../../services/attachment.service";
import Button from "@material-ui/core/Button";
import {Divider, Grid, Paper, Typography, withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = theme => ({
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
    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1),
        // display: 'flex',
    },
    paper2: {
        margin: theme.spacing(3),
        padding: theme.spacing(3),
    },
    mainGrid: {
        display: 'flex',
        minWidth: 1000,
    },
    grid: {
        margin: theme.spacing(1),
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
    grid2: {
        margin: theme.spacing(1),
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
    },
    title: {
        padding: theme.spacing(3),
    },
    download: {
        backgroundColor: '#f50057',
    },
})

class ViewAttachmentsComponent extends Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
        this.getName = this.getName.bind(this);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            userFilesInfo: []
        };
    }

    async componentDidMount() {
        const response = await AttachmentService.getAttachmentsForUser(this.state.currentUser.username);
        const userFilesInfo = response.data;
        this.setState({userFilesInfo: userFilesInfo});
    }

    download(fileId, initialFileName) {
        AttachmentService.downloadAttachment(fileId, initialFileName);
    }

    getName(name) {
        if (name.length > 20) {
            return name.substring(0, 20) + '...';
        }
        return name;
    }

    render() {
        // const { currentState } = this.state;
        const {classes} = this.props;
        return (
            <Grid className={classes.mainGrid}>
                <Grid container spacing={3}>
                    <Grid item xs/>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography component="h1" className={classes.title} variant="h4">
                                Загруженные файлы
                            </Typography>
                            <Divider/>

                            {this.state.userFilesInfo.map(el => (
                                <Grid key={el.id} className={classes.grid2}>
                                    <Grid xs={5}>
                                        <Typography variant={"subtitle1"}>
                                            {this.getName(el.initialName)}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography variant={"subtitle1"}>
                                            {new Date(el.creationTime).toLocaleDateString()}
                                        </Typography>
                                    </Grid>
                                    <Button
                                        variant="contained"
                                        onClick={() => this.download(el.id, el.initialName)}
                                        color="primary"
                                        className={classes.download}
                                    >
                                        Скачать
                                    </Button>
                                </Grid>
                            ))}
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper className={classes.paper2}>
                            <Grid className={classes.grid}>

                                <Link to={"/profile/" + AuthService.getCurrentUser().username} style={{textDecoration: 'none'}}>
                                    <Button className={classes.button}>
                                        Профиль
                                    </Button>
                                </Link>
                                <Link to={"/files/upload"} style={{textDecoration: 'none'}}>
                                    <Button className={classes.button}>
                                        Загрузить файл
                                    </Button>
                                </Link>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(ViewAttachmentsComponent)