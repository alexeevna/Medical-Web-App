import React, {Component} from "react";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";
import {Card, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = theme => ({
    hMargin:{
        margin: 0
    },
    mainGrid: {
        display: 'flex',
    },
    grid: {
        margin: theme.spacing(1.5,0,0,1),
        display: 'flex',
    },
    gridContent: {
        margin: theme.spacing(2),
    },
    avatar: {
        width: 30,
        height: 30,
        margin: theme.spacing(2,0,0,2),
    },
    paper:{
        margin: theme.spacing(3),
        borderRadius: 20,
        backgroundColor: "#eeeeee"
    },
    content: {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
});

class ReviewCard extends Component {
    constructor(props) {
        super(props);

        this.convertTZ = this.convertTZ.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.getContent = this.getContent.bind(this);
        this.replyToReview = this.replyToReview.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            replyToReview: false,
        };

        this.review = this.props.review;
        this.isPreview = this.props.isPreview;
        this.isReply = this.props.isReply;

        this.creationTime = this.formatTime(this.review.creationTime);
    }

    replyToReview() {
        this.setState({
            replyToReview: true
        })
    }

    convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
    }

    getContent(content) {
        if (this.props.isPreview && content != null && content.length > 1000) {
            return content.substring(0, 1000) + '...';
        }
        return content;
    }

    formatTime(creationTime) {
        var creationTimestamp = new Date(creationTime);
        let userDate = this.convertTZ(creationTimestamp, "Asia/Dhaka");
        var hours = userDate.getHours();
        var minutes = userDate.getMinutes();
        minutes = minutes >= 10 ? minutes : '0' + minutes;
        return hours + ':' + minutes;
    }

    render() {
        const {classes} = this.props;
        return(
            <Grid>
                <Card className={classes.paper}>
                    <Grid className={classes.mainGrid}>
                        <Grid>
                            <Avatar className={classes.avatar}>
                                Photo
                            </Avatar>
                        </Grid>
                        <Grid className={classes.grid}>
                            <Grid className={classes.grid}>
                                <Link to={"/profile/" + this.review.creator.username} style={{ textDecoration: 'none', color: 'dark-blue'}}>
                                    <h6 className={classes.hMargin}> {this.review.creator.username}</h6>
                                </Link>
                            </Grid>
                            <Grid className={classes.grid}>
                                <h6 className={classes.hMargin}> {new Date(this.review.creationTime).toLocaleDateString()}</h6>
                            </Grid>
                            <Grid className={classes.grid}>
                                <h6 className={classes.hMargin}>{this.creationTime}</h6>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className={classes.gridContent}>
                        <Typography className={classes.content}>
                            {this.getContent(this.review.content)}
                        </Typography>
                    </Grid>
                </Card>
            </Grid>
        )
    }
}

export default withStyles(useStyles)(ReviewCard)