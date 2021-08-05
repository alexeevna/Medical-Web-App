import React, { Component } from "react";
import RecordService from "../services/record.service";
import { Link } from "react-router-dom";
import RecordCardNew from "./record-card-new.component";
import ReplyRecordForm from "./reply-record.form";

export default class RecordThreadComponent extends Component {
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
                    this.setState({answers: response.data});
                }
            )
            .catch(error => {
                console.log(error);
            });
    }

    render() {
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
                                style={{listStyleType: "none", width: "90%", marginLeft: "auto"}}
                                key={index}

                                // onClick={() => this.displayRecordThread(record, index)}
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
                    <Link to={"/records/create"} className="nav-link card-link-custom color-orange">
                        Создать пост
                    </Link>
                    <Link to={"/records/view"} className="nav-link card-link-custom color-orange">
                        Обратно к постам
                    </Link>
                </div>
            </div>
        );
    }
}