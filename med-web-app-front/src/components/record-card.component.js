import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AttachmentService from "../services/attachment.service";
import '../styles/Record.css'

export default class RecordCard extends Component {
    constructor(props) {
        super(props);

        this.getContent = this.getContent.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            filePreviews: [],
        };

        this.record = this.props.record;
        this.isPreview = this.props.isPreview;
        this.isReply = this.props.isReply;

        var creationTimestamp = new Date(this.record.creationTime);
        var hours = creationTimestamp.getHours();
        var minutes = creationTimestamp.getMinutes();
        this.creationTime = hours + ':' + minutes;

    }


    getContent(content) {
        if (this.props.isPreview && content != null && content.length > 40) {
            return content.substring(0, 110) + '...';
        }
        return content;
    }

    componentDidMount() {
        let preview = [];
        if (this.record.attachments !== undefined &&  this.record.attachments !== null) {
            for (let i = 0; i < this.record.attachments.length; i++) {
                console.log(this.record.attachments[i]);
                if (this.record.attachments[i].initialName.endsWith(".jpg") ||
                    this.record.attachments[i].initialName.endsWith(".png")  ||
                    this.record.attachments[i].initialName.endsWith(".dcm") ) {
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

    endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    render() {

        return (
            <div className="row color-light-blue record-card top-buffer-30">
                <div className="col-sm-3 ">
                    <div className="record-info-box align-content-center">
                        <div className="center-vertical">
                            <h6 className="fa fa-user"> {this.record.creator.username}</h6>
                            <br/>
                            <h6 className="fa fa-calendar"> {new Date(this.record.creationTime).toLocaleDateString()}</h6>
                            <br/>
                            <h6>{this.creationTime}</h6>
                        </div>
                    </div>
                </div>

                <div className="col-sm-9">
                    {!this.props.isReply &&
                        <header className="record-jumbotron align-center bottom-buffer-10">
                            <h3><strong>{this.record.title}</strong></h3>
                        </header>
                    }

                    <div className="bottom-buffer-10">{this.getContent(this.record.content)}</div>

                    {!this.isPreview && this.state.filePreviews.map(el => (
                        <img key={el.id} alt="" className="col-sm-6 top-buffer-10" src={el.image} />
                    ))}


                    {this.isPreview &&
                        <div className="col-sm-4 fa fa-comments" style={{"float": "right"}}> {this.record.numberOfReplies}</div>
                    }
                </div>
            </div>
        );
    }
}