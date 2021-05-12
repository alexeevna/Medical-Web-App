import React, { Component } from "react";
import AuthService from "../services/auth.service";
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

        console.log(this.props.isPreview);
        console.log(this.props.isReply);

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
        /*
        let preview = [];
        if (this.record.attachments !== undefined &&  this.record.attachments !== null)
            for (let i = 0; i < this.record.attachments.length; i++) {
                AttachmentService.getPreview(this.record.attachments[i].id).then(response => {
                    console.log(response.data);
                    preview.push({id: this.record.attachments[i].id, image: response.data});
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
                        <div>A picture...</div>
                        // <img key={el.id} className="top-buffer-10" src={`data:image/jpeg;base64, ${el.image}`} />
                    ))}


                    {!this.isReply &&
                        <div className="col-sm-4 fa fa-comments" style={{"float": "right"}}></div>
                    }
                </div>
            </div>
        );
    }
}