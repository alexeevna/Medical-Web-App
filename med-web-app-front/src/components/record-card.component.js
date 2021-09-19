import React, {Component} from "react";
import AuthService from "../services/auth.service";
import AttachmentService from "../services/attachment.service";
import '../styles/Record.css'
import {Grid, Link, Paper, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {purple} from "@material-ui/core/colors";

const useStyles = theme => ({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: purple[500],
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
        textPrimary: {
            main: "#1B435D",
        }
    },
    gridCreatorName: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        "& .MuiTypography-root": {
            color: "black",
        },
    },
    grid: {
        "& .MuiTypography-root": {
            color: "black",
        },
        margin: theme.spacing(1.5,0,0,1),
    },
    ggrid: {
        margin: theme.spacing(0,0,0,1),
        display: 'flex',
    },
    gridContent: {
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 700,
        borderColor:"#e9e9e9",
        borderRadius: 10,
        minWidth: 700,
    },
    mainGrid: {
        margin: 0,
    },
    tagsColor: {
        color: "#6d6d6d",
    },
    content: {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
    titleStyle: {
        size: 15,
    },
})

class RecordCardNew extends Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
        this.convertTZ = this.convertTZ.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.getContent = this.getContent.bind(this);
        this.displayRecordThread = this.displayRecordThread.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            filePreviews: [],
        };

        this.record = this.props.record;
        this.isPreview = this.props.isPreview;
        this.isReply = this.props.isReply;
        this.creationTime = this.formatTime(this.record.creationTime);
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

    displayRecordThread() {
        this.props.history.push({
            pathname: '/records/thread/' + this.record.id,
            state: { recordId: this.record.id }
        });
        window.location.reload();
    }

    componentDidMount() {
        let preview = [];
        if (this.record.attachments !== undefined && this.record.attachments !== null) {
            for (let i = 0; i < this.record.attachments.length; i++) {
                if (this.record.attachments[i].initialName.endsWith(".jpg") ||
                    this.record.attachments[i].initialName.endsWith(".png") ||
                    this.record.attachments[i].initialName.endsWith(".dcm")) {
                    AttachmentService.getPreviewNew(this.record.attachments[i].id).then(response => {
                        preview.push({id: this.record.attachments[i].id, image: URL.createObjectURL(response.data)});
                        this.setState({filePreviews: preview});
                    }).catch(error => {
                        console.log(error);
                    })
                }
            }
        }
    }

    download(fileId, initialFileName) {
        AttachmentService.downloadAttachment(fileId, initialFileName);
    }

    endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.paper} variant="outlined" >
                <Grid container item xs={12} sm direction={"column"} className={classes.mainGrid}>
                    <Grid container item className={classes.ggrid} xs direction={"row"} spacing={1}>
                        <Grid className={classes.gridCreatorName}>
                            <Link variant={"subtitle2"} href={"/profile/" + this.record.creator.username}>
                                {this.record.creator.username}
                            </Link>
                        </Grid>
                        <Grid className={classes.ggrid}>
                            <Typography variant={"subtitle1"}>
                                {new Date(this.record.creationTime).toLocaleDateString()}
                            </Typography>
                        </Grid>
                        <Grid className={classes.ggrid}>
                            <Typography variant={"subtitle1"}>
                                {this.creationTime}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid className={classes.grid}>
                        {this.isPreview ? (
                            <Typography variant="h6">{/*gutterBottom*/}
                                <Link href={"/records/thread/" + this.record.id}>
                                    {this.record.title}
                                </Link>
                            </Typography>
                            ): (
                            <Typography variant="h6">{/*gutterBottom*/}
                                {this.record.title}
                            </Typography>)
                        }
                    </Grid>
                    <Grid className={classes.gridContent}>
                        <Typography variant="body1" className={classes.content}>{/*gutterBottom*/}
                            {this.getContent(this.record.content)}
                        </Typography>
                    </Grid>
                    <Grid className={classes.grid} container direction={"row"} spacing={1}>
                        {this.record.topics && this.record.topics.map(el => (
                            <Grid item key={el.id} color={"#616161"}>
                                <Typography className={classes.tagsColor}>
                                    {el.name}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>



                    {!this.isPreview && this.state.filePreviews.map(el => (
                        <img key={el.id} alt="" className="col-sm-12 top-buffer-10" src={el.image}/>
                    ))}

                    {!this.isPreview && this.record.attachments.map(el => (
                        // <img key={el.id} alt="" className="col-sm-6 top-buffer-10" src={el.image} />
                        <div key={el.id} className="row top-buffer-10">
                            {/*<div className="col-sm-5">{el.initialName}</div>*/}
                            <div>
                                <button
                                    style={{marginLeft: "30px", borderStyle: "none"}}
                                    className="btn-sm btn-primary color-white"
                                    onClick={() => this.download(el.id, el.initialName)}>
                                    <i className="fa fa-download"> Скачать {el.initialName}</i>
                                </button>
                            </div>
                        </div>
                    ))}


                    {this.isPreview &&
                    <div className="col-sm-2 fa fa-comments"
                         style={{"float": "right"}}> {this.record.numberOfReplies}</div>
                    }



                </Grid>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(RecordCardNew)