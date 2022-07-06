import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import PipelineService from "../../services/pipeline.service";
import {Link} from "react-router-dom";

export default class SavePipelineConfigComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSaveRecord = this.handleSaveRecord.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeConfiguration = this.onChangeConfiguration.bind(this);
        // this.delete = this.delete.bind(this);
        // this.handleClickOpen = this.handleClickOpen.bind(this)
        // this.handleClose = this.handleClose.bind(this)

        this.state = {
            description: "",
            configuration: "",
            submittedSuccessfully: false,
            message: null,
            pipelines: [],
            open: false
        };
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeConfiguration(e) {
        this.setState({
            configuration: e.target.value
        });
    }

    handleSaveRecord(e) {
        e.preventDefault();

        if (this.checkBtn.context._errors.length === 0) {
            PipelineService.savePipeline(this.state.configuration, this.state.description).then(
                () => {
                    this.setState({
                        submittedSuccessfully: true,
                        message: "Успешно сохранено",
                        description: "",
                        configuration: ""
                    });
                },
                error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    this.setState({
                        submittedSuccessfully: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    componentDidMount() {
        PipelineService.getAllPipelines().then(
            response => {
                let pipelinesForSelect = response.data.map(el => {
                    return {id: el.id, name: el.description};
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
    }

    // handleClickOpen() {
    //     this.setState({open: true})
    // }
    //
    // handleClose() {
    //     this.setState({open: false})
    // }
    //
    // delete(pipelineId) {
    //     PipelineService.deletePipeline(AuthService.getCurrentUser().username, pipelineId).then();
    //     this.setState({open: false})
    // }

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-sm-9">
                        <div className="card record-create-form color-light-blue">
                            <Form
                                onSubmit={this.handleSaveRecord}
                                ref={c => {
                                    this.inputForm = c;
                                }}
                            >
                                <div className="form-group">
                                    <label htmlFor="title">Краткое описание:</label>
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        className="form-control"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="content">Конфигурация (json):</label>
                                    <textarea className="form-control"
                                              id="exampleFormControlTextarea1"
                                              rows="4"
                                              onChange={this.onChangeConfiguration}
                                              value={this.state.configuration}
                                              autoComplete="off"
                                    >
                                </textarea>
                                </div>

                                <div className="form-group top-buffer-10">
                                    <button
                                        className="btn btn-primary btn-block color-dark-blue"
                                        disabled={!this.state.description || !this.state.configuration}
                                    >
                                        <span>Сохранить</span>
                                    </button>
                                </div>

                                {this.state.message && (
                                    <div className="form-group">
                                        <div
                                            className={
                                                this.state.submittedSuccessfully
                                                    ? "alert alert-success"
                                                    : "alert alert-danger"
                                            }
                                            role="alert"
                                        >
                                            {this.state.message}
                                        </div>
                                    </div>
                                )}

                                <CheckButton
                                    style={{display: "none"}}
                                    ref={c => {
                                        this.checkBtn = c
                                    }}
                                />
                            </Form>
                        </div>
                    </div>

                    <div className="col-sm-2 align-center">
                        <Link to={"/pipelines/create"} className="nav-link card-link-custom color-orange">Запустить
                            конвейер</Link>
                        <Link to={"/pipelines/results"} className="nav-link card-link-custom color-orange">Запущенные
                            конвейеры</Link>
                    </div>


                    <div className="col-sm-1"/>

                </div>
                <div>
                    Уже имеющиеся конфигурации:
                    {this.state.pipelines.map(el => (
                        <div key={el.id} className="row top-buffer-10">
                            <div className="col-sm-3 line-break">{el.name}</div>
                            {/*<div className="col-sm-1">*/}
                            {/*    <IconButton aria-label="delete"*/}
                            {/*                size="small"*/}
                            {/*                style={{width: 5, color: '#444',}}*/}
                            {/*                onClick={() => this.handleClickOpen()}>*/}
                            {/*        <DeleteIcon fontSize="small"/>*/}
                            {/*    </IconButton>*/}
                            {/*</div>*/}
                            {/*<Dialog*/}
                            {/*    open={this.state.open}*/}
                            {/*    onClose={this.handleClose}*/}
                            {/*    aria-labelledby="alert-dialog-title"*/}
                            {/*    aria-describedby="alert-dialog-description"*/}
                            {/*>*/}
                            {/*    <DialogTitle id="alert-dialog-title">*/}
                            {/*        {"Вы действительно хотите удалить конфигурацию?"}*/}
                            {/*    </DialogTitle>*/}
                            {/*    <DialogActions>*/}
                            {/*        <Button onClick={this.handleClose}>Нет</Button>*/}
                            {/*        <Button onClick={() => this.delete(el.id)}*/}
                            {/*                autoFocus>*/}
                            {/*            Да*/}
                            {/*        </Button>*/}
                            {/*    </DialogActions>*/}
                            {/*</Dialog>*/}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}