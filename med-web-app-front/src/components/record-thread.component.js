import React, { Component } from "react";
import RecordService from "../services/record.service";
import { Link } from "react-router-dom";
import RecordCard from "./record-card-preview.component";

export default class RecordThreadComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recordId: this.props.location.state.recordId,
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
        const { record, answers} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">

                    {this.state.record ?
                        (<RecordCard record={this.state.record}/>)
                     :
                        (<h4>Empty(((</h4>)
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
                </div>

                <div className="col-md-4">
                    <Link to={"/records/create"} className="nav-link card-link-custom color-orange">
                        Создать пост
                    </Link>
                    <Link to={"/profile"} className="nav-link card-link-custom color-orange">
                        Мои посты
                    </Link>
                </div>

            </div>
        );
    }
}