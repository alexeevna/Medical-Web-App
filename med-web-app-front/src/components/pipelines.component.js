import React, { Component } from "react";
import Select from 'react-select';
import AuthService from "../services/auth.service";
import PipelineService from "../services/pipeline.service"
import PipelineJobService from "../services/pipelinejob.service"
import AttachmentService from "../services/attachment.service"
import {Link} from "react-router-dom";

export default class PipelinesComponent extends Component {
    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.createSelectPipelineItems = this.createSelectPipelineItems.bind(this);
        this.onPipelineDropdownSelected = this.onPipelineDropdownSelected.bind(this);
        this.onFileDropdownSelected = this.onFileDropdownSelected.bind(this);
        this.submitPipeline = this.submitPipeline.bind(this);

        this.state = {
            currentUser: user,
            pipelines: [],
            files: [],
            message: [],
            selectedFile: null,
            selectedPipeline: null,
            submitted: false
        };
    }

    componentDidMount() {
        PipelineService.getAllPipelines().then(
            response => {
                let pipelinesForSelect = response.data.map(el => {
                    return {value: el.id, label: el.description};
                })
                this.setState({
                    pipelines: pipelinesForSelect
                });
            },
            error => {
                this.setState({
                    content: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                });
            }
        );

        //console.log(this.state.user.username);
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

    createSelectPipelineItems() {
        let items = [];
        if (this.state !== undefined && this.state.pipelines !== undefined && this.state.pipelines.length > 0) {
            for (let i = 0; i <= this.state.pipelines.length; i++) {
                items.push(<option key={i} value={this.state.pipelines[i].id}>
                    {this.state.pipelines[i].description}
                </option>);
            }
        }
        return items;
    }

    onPipelineDropdownSelected(selectedValue) {
        console.log("Selected pipeline", selectedValue);
        this.setState({selectedPipeline: selectedValue.value});
    }

    onFileDropdownSelected(selectedValue) {
        console.log("Selected file", selectedValue);
        this.setState({selectedFile: selectedValue.value});
    }

    submitPipeline() {
        console.log("Submitted pipeline");
        PipelineJobService.sendRequestForPipelineJob(this.state.currentUser.username,
            this.state.selectedPipeline, this.state.selectedFile).then(
                response => {
                    console.log("Submit ok");
                },
                error => {
                    console.log("Submit error");
                    this.setState({
                        content: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                    });
                }
        )
        this.setState({submitted: true});
        //this.props.history.push("/pipelines/results");
    }

    render() {
        const { pipelines, files, selectedFile, selectedPipeline, submitted } = this.state;

        return (

            <div className="row">
                <div className=" col-sm-9 align-content-center top-buffer-10">

                    <header className="jumbotron align-text-center color-light-blue">
                        <h3><strong>Запустить конвейер:</strong></h3>
                    </header>

                    <div className="view-card color-light-blue">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row top-buffer-10">
                                <div className="col-3">Тип конвейера:</div>
                                <Select className="col-9 col-offset-4"
                                        onChange={this.onPipelineDropdownSelected}
                                        options={pipelines}
                                        autoFocus={true}
                                />
                            </div>
                            <div className="row top-buffer-10">
                                <div className="col-3">Изображение:</div>
                                <Select className="col-9 col-offset-4"
                                        onChange={this.onFileDropdownSelected}
                                        options={files}
                                        autoFocus={true}
                                />
                            </div>
                        </form>


                        <div className="col-3 center-horizontal top-buffer-30">
                            <button
                                className="btn btn-primary color-middle-blue"
                                disabled={selectedFile == null || selectedPipeline == null || submitted}
                                onClick={this.submitPipeline}
                            >Запустить</button>
                        </div>

                    </div>

                </div>
                <div className="col-sm-2 align-center">
                    <Link to={"/pipelines/results"} className="nav-link card-link-custom color-orange">Запущенные конвейеры</Link>
                </div>

                <div className="col-sm-1"></div>
            </div>
        );
    }
}