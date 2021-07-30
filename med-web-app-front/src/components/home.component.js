import React, { Component } from "react";

import TestService from "../services/test.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        TestService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron color-light-blue">
                    <h3>Medical-Web-App</h3>
                </header>

                <div className="card color-light-blue">
                    <i className="fa fa-check-circle top-buffer-10">  Храните анонимизированные медицинские DICOM-изображения</i>
                    <i className="fa fa-check-circle top-buffer-10">  Запускайте конвейеры с этими изображениями</i>
                    <i className="fa fa-check-circle top-buffer-10">  Создавайте и комментируйте посты с вопросами на интересующие Вас темы</i>
                </div>
            </div>
        );
    }
}