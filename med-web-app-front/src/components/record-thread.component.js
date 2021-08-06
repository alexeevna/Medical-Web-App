import React, { Component } from "react";
import RecordService from "../services/record.service";
import { Link } from "react-router-dom";
import RecordCardNew from "./record-card-new.component";
import ReplyRecordForm from "./reply-record.component";
import {Card, Grid, withStyles} from "@material-ui/core";
import ReviewCard from "./review-card.component";

const useStyles = theme => ({
    mainGrid: {
        marginTop: theme.spacing(1),
        minWidth: 712,
        maxWidth: 712,
    },
    paper: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: theme.spacing(1),
        color: "black",
        // display: 'flex',
    },
    Grid: {
        minWidth: 1100,
        display: "flex",
    }
});

class RecordThreadComponent extends Component {
    constructor(props) {
        super(props);

        this.refreshAnswers = this.refreshAnswers.bind(this);

        this.state = {
            //recordId: null,
            recordId: this.props.match.params.recordId,
            record: null,
            answers: [],
        };
    }

    componentDidMount() {
        console.log("componentDidMount-thread");
        RecordService.getRecord(this.state.recordId)
            .then(response => {
                    this.setState({record: response.data});
                }
            )
            .catch(error => {
                console.log(error);
            });

        this.refreshAnswers();
    }

    refreshAnswers() {
        console.log("refreshAnswers");
        RecordService.getAnswers(this.state.recordId)
            .then(response => {
                console.log(response.data);
                this.setState({answers: []});
                this.setState({answers: response.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { classes } = this.props;
        const { answers } = this.state;
        return (
            <Grid xs={12} item className={classes.Grid}>
                <Grid xs={8} item>
                    <Grid className={classes.mainGrid}>
                        {this.state.record &&
                        (<RecordCardNew record={this.state.record} isPreview={false} isReply={false}/>)
                        }
                        <Card className={classes.paper}>

                            <ReplyRecordForm
                                refreshRecords = {this.refreshAnswers}
                                parentId = {this.state.recordId}/>

                            <ul className="list-group">
                                {answers !== undefined && this.state.answers !== null &&
                                this.state.answers.map((record, index) => (
                                    <li
                                        style={{listStyleType: "none", width: "100%", marginLeft: "auto", marginTop: "1"}}
                                        key={index}
                                        >
                                        <ReviewCard review={record} isPreview={false} isReply={true}/>
                                    </li>

                                ))}
                            </ul>
                        </Card>
                    </Grid>
                </Grid>
                <Grid xs={4} item>
                    <div className="col-md-3">
                        <Link to={"/records/create"} className="nav-link card-link-custom color-orange">
                            Создать пост
                        </Link>
                        <Link to={"/records/view"} className="nav-link card-link-custom color-orange">
                            Обратно к постам
                        </Link>
                    </div>
                </Grid>


            </Grid>
        );
    }
}

export default withStyles(useStyles)(RecordThreadComponent)