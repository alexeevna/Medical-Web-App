import React, { Component } from "react";
import AuthService from "../services/auth.service";
import PipelineJobService from "../services/pipelinejob.service"
import AttachmentService from "../services/attachment.service"
import {Link} from "react-router-dom";

export default class PipelineResultsComponent extends Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            pipelineJobs: [],
            message: ""
        };
    }

    componentDidMount() {
        PipelineJobService.getPipelineJobsForUser(AuthService.getCurrentUser().username).then(
            response => {
                let jobs = [];
                response.data.forEach(el => {
                    let inputFileName = (el.inputFiles !== undefined && el.inputFiles !== null && el.inputFiles.length > 0)
                        ? el.inputFiles[0].initialName : "";
                    let outputFileName = el.outputFile !== undefined && el.outputFile !== null  ? el.outputFile.initialName : "";
                    let outputFileId = el.outputFile !== undefined && el.outputFile !== null ? el.outputFile.id : "";
                    let pipelineDescription = el.pipeline !== undefined && el.pipeline !== null ? el.pipeline.description : "";
                    let job = {
                        id: el.id,
                        pipelineName: pipelineDescription,
                        status: el.executionStatus,
                        inputName: inputFileName,
                        outputName: outputFileName,
                        outputId: outputFileId};
                    jobs.push(job);
                })

                this.setState({
                    pipelineJobs : jobs
                });
                console.log(jobs);
            },
            error => {
                this.setState({
                    content: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                });
            }
        );
    }

    download(fileId, initialFileName) {
        AttachmentService.downloadAttachment(fileId, initialFileName);
    }

    render() {
        const { pipelineJobs } = this.state;

        return (

            <div className="row">
                <div className=" col-sm-9 align-content-center top-buffer-10">

                    <header className="jumbotron align-text-center color-light-blue">
                        <h3><strong>Результаты:</strong></h3>
                    </header>

                    <div className="pipeline-results-card color-light-blue">
                        {pipelineJobs.map(el => (
                            <div key={el.id} className="row color-light-blue top-buffer-10 bordered-box">
                                <div className="col-sm-3">{el.pipelineName}</div>
                                <div className="col-sm-3">{el.inputName}</div>
                                <div className="col-sm-3">{el.outputName}</div>
                                <div className="col-sm-3">
                                    <button
                                        className="btn btn-primary btn-block color-dark-blue"
                                        onClick={() => this.download(el.outputId, el.outputName)}>Скачать результат</button>
                                </div>
                            </div>
                        ))}
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