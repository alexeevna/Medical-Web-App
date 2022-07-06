import React, {Component} from "react";
import AuthService from "../../services/auth.service";
import '../../styles/Record.css'
import {Card, Grid, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";


const useStyles = theme => ({
    mainGrid: {
        display: 'flex',
        margin:10,
    },
    grid: {
        //margin: theme.spacing(1.5, 0, 0, 1),
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(3),
        borderRadius: 20,
        backgroundColor: "#eeeeee"
    },
    hMargin: {
        margin: 0
    },
    content: {
        wordWrap: 'break-word',
        maxWidth: 400,
        marginLeft: 10,
    },
})

class TopicCard extends Component {
    constructor(props) {
        super(props);

        this.convertTZ = this.convertTZ.bind(this);
        this.formatTime = this.formatTime.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };

        this.topic = this.props.topic;
        this.creationTime = this.formatTime(this.topic.creationTime);

    }

    convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
    }

    formatTime(creationTime) {
        var creationTimestamp = new Date(creationTime);
        let userDate = this.convertTZ(creationTimestamp, "Asia/Dhaka");
        var hours = userDate.getHours();
        var minutes = userDate.getMinutes();
        minutes = minutes >= 10 ? minutes : '0' + minutes;
        let creationTimeString = hours + ':' + minutes;
        return creationTimeString;
    }

    render() {
        const {classes} = this.props;
        return (

            /*<div className="row color-light-blue topic-card top-buffer-10">
                <div className="col-sm ">
                    <div className="topic-info-box align-content-center">
                        <div className="center-vertical">
                            <h6> {this.topic.creator.username}</h6>
                            <h6> {new Date(this.topic.creationTime).toLocaleDateString()}</h6>
                            <h6>{this.creationTime}</h6>
                        </div>
                    </div>
                </div>

                <div className="col-sm ">
                    <header className="record-jumbotron align-center bottom-buffer-10 line-break">
                        <div className="bottom-buffer-10"> {this.topic.name}</div>
                    </header>
                </div>
            </div>*/
            <Grid spacing={1}>
                <Card className={classes.paper}>
                    <Grid className={classes.mainGrid}>
                        <Grid className={classes.grid}>
                            <Grid className={classes.grid}>
                                <Link to={"/profile/" + this.topic.creator.username}
                                      style={{textDecoration: 'none', color: 'dark-blue'}}>
                                    <h6 className={classes.hMargin}> {this.topic.creator.username}</h6>
                                </Link>

                            </Grid>
                            {/*<Grid item>
                            <Typography variant={"subtitle1"}>
                                {new Date(this.topic.creationTime).toLocaleDateString()}
                            </Typography>

                        </Grid>
                        <Grid item>
                            <Typography variant={"subtitle1"}>
                                {this.creationTime}
                            </Typography>
                        </Grid>*/}
                            {/*</Grid>*/}
                            <Grid>
                                <Typography variant="body1" className={classes.content}>{/*gutterBottom*/}
                                    {this.topic.name}
                                </Typography>

                            </Grid>
                        </Grid>

                    </Grid>
                </Card>
            </Grid>
        )

    }
}

export default withStyles(useStyles)(TopicCard)