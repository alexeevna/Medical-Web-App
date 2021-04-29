import React, { Component } from "react";
import Select from 'react-select';
import AuthService from "../services/auth.service";
import PipelineService from "../services/pipeline.service"
import AttachmentService from "../services/attachment.service"
import {Link} from "react-router-dom";

export default class PipelineResultsComponent extends Component {
    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            pipelines: [],
            files: [],
            message: [],
            selectedFile: null,
            selectedPipeline: null,
        };
    }

    componentDidMount() {
        AttachmentService.getAttachmentsForUser(AuthService.getCurrentUser().username).then(
            response => {
                let filteredDicoms = response.data.filter( function (file) {
                    return file.initialName.includes(".dcm");
                });

                let filteredDicomsForSelect = filteredDicoms.map(el => {
                    return {value: el.id, label: el.initialName};
                })
                this.setState({
                    files : filteredDicomsForSelect
                });
            },
            error => {
                this.setState({
                    content: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                });
            }
        );
    }

    render() {
        const {  } = this.state;

        return (

            <div className="row">
                <div className=" col-sm-9 align-content-center top-buffer-10">

                    <header className="jumbotron align-text-center color-light-blue">
                        <h3><strong>Результаты:</strong></h3>
                    </header>

                    <div className="view-card color-light-blue">

                    </div>

                </div>
                <div className="col-sm-2 align-center">
                    <Link to={"/pipelines/create"} className="nav-link card-link-custom color-orange">Запустить конвейеры</Link>
                </div>

                <div className="col-sm-1"></div>
            </div>
        );
    }
}