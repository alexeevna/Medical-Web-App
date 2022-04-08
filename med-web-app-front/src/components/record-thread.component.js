import React, { Component } from "react";
import RecordService from "../services/record.service";
import RecordCard from "./record-card.component";
import ReplyRecordForm from "./reply-record.component";
import {Card, Grid, withStyles} from "@material-ui/core";
import ReviewCard from "./review-card.component";
import Button from "@material-ui/core/Button";

const useStyles = theme => ({
    mainGrid: {
        marginTop: theme.spacing(3),
        minWidth: 712,
        maxWidth: 712,
    },
    paper2: {
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        color: "black",
    },
    grid: {
        margin: theme.spacing(1),
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
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
        RecordService.getAnswers(this.state.recordId)
            .then(response => {
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
                        (<RecordCard record={this.state.record} isPreview={false} isReply={false}/>)
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
                    <Card className={classes.paper2}>
                        <Grid className={classes.grid}>
                            <Button variant="contained" href="/records/create" className={classes.button}>
                                Создать пост
                            </Button>
                            <Button variant="contained" href="/records/view" className={classes.button}>
                                Обратно к постам
                            </Button>
                        </Grid>
                    </Card>
                </Grid>


            </Grid>
        );
    }
}

export default withStyles(useStyles)(RecordThreadComponent)