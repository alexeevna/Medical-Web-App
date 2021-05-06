import React, { Component } from "react";
import AuthService from "../services/auth.service";
import '../styles/Record.css'

export default class RecordCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };

        this.record = this.props.record;
        this.preview = this.props.preview;

        var creationTimestamp = new Date(this.record.creationTime);
        var hours = creationTimestamp.getHours();
        var minutes = creationTimestamp.getMinutes();
        this.creationTime = hours + ':' + minutes;
    }

    render() {

        return (
            <div className="row color-light-blue record-card top-buffer-30">
                <div className="col-sm-3 ">
                    <div className="record-info-box align-content-center">
                        <div className="center-vertical">
                            <h6>{this.record.creator.username}</h6>
                            <h6>{new Date(this.record.creationTime).toLocaleDateString()}</h6>
                            <h6>{this.creationTime}</h6>
                        </div>
                    </div>
                </div>

                <div className="col-sm-9">
                    <header className="record-jumbotron align-center">
                        <h3><strong>{this.record.title}</strong></h3>
                    </header>

                    <div className="top-buffer-10">{this.record.content}</div>

                    <div className="row top-buffer">
                        <div className="col-sm-4">Лайки: {this.record.likes}</div>
                        <div  className="col-sm-4"></div>
                        <div className="col-sm-4">Ответы: </div>
                    </div>
                </div>
            </div>
        );
    }
}