import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AttachmentService from "../services/attachment.service";

export default class BoardViewAttachments extends Component {
    constructor(props) {
        super(props);

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

    render() {
        // const { currentState } = this.state;

        return (
            <div className="container">
                <header className="jumbotron align-center color-light-blue">
                    <h3><strong>Загруженные файлы</strong></h3>
                </header>

                <div>
                    <div className="card">
                        {this.state.userFilesInfo.map(el => (
                            <div key={el.id} className="row color-light-blue">
                                <div className="col-sm-5">{el.initialName}</div>
                                <div className="col-sm-5">{el.creationTime}</div>
                                <div className="col-sm-2">Download</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}