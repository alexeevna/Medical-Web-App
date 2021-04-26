import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AttachmentService from "../services/attachment.service";
import {Link} from "react-router-dom";

export default class BoardViewAttachments extends Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            userFilesInfo: []
        };
    }

    async componentDidMount(){
        const response = await AttachmentService.getAttachmentsForUser(this.state.currentUser.username);
        const userFilesInfo = response.data
        console.log(userFilesInfo);
        this.setState({userFilesInfo: userFilesInfo});
    }

    download(fileId, initialFileName) {
        var response = AttachmentService.downloadAttachment(fileId, initialFileName);
        //console.log(response.data);
        //event.preventDefault();
    }


    render() {
        // const { currentState } = this.state;

        return (
            <div className="container">

                <div className="row">
                    <div className="col-sm-9">
                        <header className="jumbotron align-center color-light-blue">
                            <h3><strong>Загруженные файлы</strong></h3>
                        </header>

                        <div className="view-attachments-card color-light-blue">
                            {this.state.userFilesInfo.map(el => (
                                <div key={el.id} className="row color-light-blue top-buffer-custom">
                                    <div className="col-sm-5">{el.initialName}</div>
                                    <div className="col-sm-4">{new Date(el.creationTime).toLocaleDateString()}</div>
                                    <div className="col-sm-3">
                                        <button
                                            className="btn btn-primary btn-block color-dark-blue"
                                            onClick={() => this.download(el.id, el.initialName)}>Скачать</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-sm-2 align-center">
                        <Link to={"/profile"} className="nav-link card-link-custom color-orange">
                            Профиль
                        </Link>
                        <Link to={"/files/upload"} className="nav-link card-link-custom color-orange">
                            Загрузить файл
                        </Link>
                    </div>

                    <div className="col-sm-1"></div>
                </div>

            </div>
        );
    }
}