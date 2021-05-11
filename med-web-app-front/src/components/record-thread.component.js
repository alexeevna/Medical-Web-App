import React, { Component } from "react";
import RecordService from "../services/record.service";
import { Link } from "react-router-dom";
import RecordCard from "./record-card-preview.component";
import ReplyRecordForm from "./reply-record.form";

export default class RecordThreadComponent extends Component {
    constructor(props) {
        super(props);

        this.refreshAnswers = this.refreshAnswers.bind(this);

        console.log(this.props);

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
                    console.log(response.data);
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
        const { answers} = this.state;

        return (
            <div className="list row">
                <div className="col-md-9">

                    {this.state.record ?
                        (<RecordCard record={this.state.record}/>)
                     :
                        (<h4> </h4>)
                    }

                    <ul className="list-group">
                        {answers !== undefined && this.state.answers !== null &&
                        this.state.answers.map((record, index) => (
                            <li
                                style={{listStyleType: "none"}}
                                key={index}
                                // onClick={() => this.displayRecordThread(record, index)}
                            >
                                <RecordCard record={record}/>
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
                    {/*<Link to={"/profile"} className="nav-link card-link-custom color-orange">*/}
                    {/*    Мои посты*/}
                    {/*</Link>*/}
                </div>
            </div>
        );
    }
}