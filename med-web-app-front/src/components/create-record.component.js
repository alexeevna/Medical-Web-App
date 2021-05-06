import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import Select from "react-select";
import AttachmentService from "../services/attachment.service";
import TopicService from "../services/topic.service";
import RecordService from "../services/record.service"

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger " role="alert">
                Надо заполнить это поле!
            </div>
        );
    }
};

export default class CreateRecordComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitRecord = this.handleSubmitRecord.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onFileDropdownSelected = this.onFileDropdownSelected.bind(this);
        this.onTopicsDropdownSelected = this.onTopicsDropdownSelected.bind(this);

        this.state = {
            title: "",
            content: "",
            availableFiles: [],
            selectedFiles: null,
            availableTopics: [],
            selectedTopics: [],
            loading: false,
            message: ""
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    onFileDropdownSelected(selectedValues) {
        let fileIds = selectedValues.map(file => file.value);
        this.setState({selectedFiles: fileIds});
    }

    onTopicsDropdownSelected(selectedValues) {
        let topicIds = selectedValues.map(topic => topic.value);
        this.setState({selectedTopics: topicIds});
    }

    handleSubmitRecord(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        const {title, content, files, topics} = this.state;

        if (this.checkBtn.context._errors.length === 0) {
            RecordService.saveRecord(this.state.title, this.state.content, this.state.selectedTopics, this.state.selectedFiles).then(
                () => {
                    this.setState({
                        loading: false,
                        message: "Успешно опубликовано"
                    });
                    // this.props.history.push("/profile");
                    // window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    this.setState({
                        loading: false,
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
        AttachmentService.getAttachmentsForUser(AuthService.getCurrentUser().username)
            .then(response => {
                let filteredDicomsForSelect = response.data.map(el => {
                    return {value: el.id, label: el.initialName};
                })
                this.setState({
                    availableFiles : filteredDicomsForSelect
                });
            },
            error => { console.log(error); }
        );

        TopicService.getAllTopics()
            .then(response => {
                let topicsForSelect = response.data.map(el => {
                    return {value: el.id, label: el.name};
                })
                this.setState({
                    availableTopics : topicsForSelect
                });
            },
            error => { console.log(error); }
        );

    }

    render() {

        return (
            <div className="col-md-12">
                <div className="card record-create-form color-light-blue">
                    <Form
                        onSubmit={this.handleSubmitRecord}
                        ref={c => {this.form = c;}}
                    >
                        <div className="form-group">
                            <label htmlFor="title">Заголовок:</label>
                            <Input
                                type="text"
                                autoComplete="off"
                                className="form-control"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                validations={[required]}
                            />
                        </div>

                        <div
                            className="form-group">
                            <label htmlFor="content">Содержание:</label>
                            <Input
                                type="text"
                                autoComplete="off"
                                className="form-control card-200"
                                name="content"
                                value={this.state.content}
                                onChange={this.onChangeContent}
                                validations={[required]}
                            />
                        </div>

                        <div className="row top-buffer-10">
                            <label htmlFor="selectedTopics" className="col-sm-2">Тэги:</label>
                            <Select className="col-sm-10"
                                    onChange={this.onTopicsDropdownSelected}
                                    options={this.state.availableTopics}
                                    autoFocus={true}
                                    isMulti={true}
                            />
                        </div>

                        <div className="row top-buffer-10">
                            <label htmlFor="selectedFiles" className="col-sm-2">Прикрепить:</label>
                            <Select
                                className="col-sm-10"
                                onChange={this.onFileDropdownSelected}
                                options={this.state.availableFiles}
                                autoFocus={true}
                                isMulti={true}
                            />
                        </div>

                        <div className="form-group top-buffer-10">
                            <button
                                className="btn btn-primary btn-block color-dark-blue"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Опубликовать</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {this.checkBtn = c;}}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}