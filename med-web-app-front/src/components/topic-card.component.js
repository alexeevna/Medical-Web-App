import React, {Component} from "react";
import AuthService from "../services/auth.service";
import '../styles/Record.css'

export default class TopicCard extends Component {
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
        return (
            <div className="row color-light-blue topic-card top-buffer-10">
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
            </div>
        )

    }
}