import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AttachmentService from "../services/attachment.service";
import '../styles/Record.css'

export default class RecordCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            filePreview: null,
        };

        this.record = this.props.record;
        this.preview = this.props.isPreview;

        var creationTimestamp = new Date(this.record.creationTime);
        var hours = creationTimestamp.getHours();
        var minutes = creationTimestamp.getMinutes();
        this.creationTime = hours + ':' + minutes;
    }

    componentDidMount() {
        /*
        let preview = [];
        if (this.record.attachments !== undefined &&  this.record.attachments !== null)
        for (let i = 0; i < this.record.attachments.length; i++) {
            AttachmentService.getPreview(this.record.attachments[i]).then(response => {
                preview.push(response.data);
                this.setState({filePreviews: preview});
            }).catch(error => {
                console.log(error);
            })
        }

         */
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

                {this.state.filePreviews.map(el => (
                    <img key={el.id} className="top-buffer-10" src="data:image/png;base64,{el}" />
                ))}


                <div className="col-sm-9">
                    <header className="record-jumbotron align-center">
                        <h3><strong>{this.record.title}</strong></h3>
                    </header>

                    <div className="top-buffer-10">{this.record.content}</div>

                    <div className="row top-buffer">
                        <div className="col-sm-8"></div>
                        <div className="col-sm-4">Ответы: </div>
                    </div>
                </div>
            </div>
        );
    }
}