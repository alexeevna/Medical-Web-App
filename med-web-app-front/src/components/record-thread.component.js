import React, { Component } from "react";
import RecordService from "../services/record.service";
import { Link } from "react-router-dom";
import RecordCardNew from "./record-card-new.component";
import ReplyRecordForm from "./reply-record.component";
import Button from "@material-ui/core/Button";
import AuthService from "../services/auth.service";
import {withStyles} from "@material-ui/core";

const useStyles = theme => ({
    button: {
        width: 200,
        margin: theme.spacing(1),
        backgroundColor: '#f50057',
        color: 'white',
    },
})

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
                    this.setState({answers: response.data});
                }
            )
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const {classes} = this.props;
        const { answers } = this.state;
        return (
            <div className="list row">
                <div className="col-md-9">

                    {this.state.record &&
                        (<RecordCardNew record={this.state.record} isPreview={false} isReply={false}/>)
                    }

                    <ul className="list-group">
                        {answers !== undefined && this.state.answers !== null &&
                        this.state.answers.map((record, index) => (
                            <li
                                style={{listStyleType: "none", width: "90%", marginLeft: "auto", marginTop: "1"}}
                                key={index}
                                >
                                <RecordCardNew record={record} isPreview={false} isReply={true}/>
                            </li>

                        ))}
                    </ul>

                    <ReplyRecordForm
                        refreshRecords = {this.refreshAnswers}
                        parentId = {this.state.recordId}/>
                </div>

                <div className="col-md-3">
                    <Button variant="contained" href={"#/records/create"} className={classes.button}>
                        Создать пост
                    </Button>
                    <Button variant="contained" href="#/records/view" className={classes.button}>
                        Обратно к постам
                    </Button>
                    {/*<Link to={"/records/create"} className="nav-link card-link-custom color-orange">*/}
                    {/*    Создать пост*/}
                    {/*</Link>*/}
                    {/*<Link to={"/records/view"} className="nav-link card-link-custom color-orange">*/}
                    {/*    Обратно к постам*/}
                    {/*</Link>*/}
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(RecordThreadComponent)