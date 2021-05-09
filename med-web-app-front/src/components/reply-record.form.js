import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import Select from "react-select";
import AttachmentService from "../services/attachment.service";
import RecordService from "../services/record.service"

export default class ReplyRecordForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitReply = this.handleSubmitReply.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onFileDropdownSelected = this.onFileDropdownSelected.bind(this);

        this.state = {
            content: "",
            availableFiles: [],
            selectedFiles: null,
            selectedFilesValue: [],
            submittedSuccessfully: false,
            message: null,
        };
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    onFileDropdownSelected(selectedValues) {
        let fileIds = selectedValues.map(file => file.value);
        this.setState({selectedFiles: fileIds,
                            selectedFilesValue: selectedValues});
    }

    handleSubmitReply(e) {
        e.preventDefault();


        if (this.checkBtn.context._errors.length === 0) {
            RecordService.saveRecord(null, this.state.content, null, this.state.selectedFiles, this.props.parentId).then(
                () => {
                    this.setState({
                        submittedSuccessfully: true,
                        message: "Успешно опубликовано",
                        content: "",
                        selectedFiles: [],
                        selectedFilesValue: [],
                        submittedSuccessfuly: true
                    });
                    this.props.refreshRecords();
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
    }

    render() {

        return (
            <div className="col-md-12">
                <div className="card record-create-form color-light-blue">
                    <Form
                        onSubmit={this.handleSubmitReply}
                        ref={c => {this.inputForm = c;}}
                    >

                        <div className="form-group">
                            <label htmlFor="content">Комментарий:</label>
                            <textarea className="form-control"
                                      id="exampleFormControlTextarea1"
                                      rows="4"
                                      onChange={this.onChangeContent}
                                      value={this.state.content}
                                      autoComplete="off"
                            >
                            </textarea>
                        </div>

                        {/*<div*/}
                        {/*    className="form-group">*/}
                        {/*    <label htmlFor="content">Комментарий:</label>*/}
                        {/*    <Input*/}
                        {/*        type="text"*/}
                        {/*        autoComplete="off"*/}
                        {/*        className="form-control card-200"*/}
                        {/*        name="content"*/}
                        {/*        value={this.state.content}*/}
                        {/*        onChange={this.onChangeContent}*/}
                        {/*    />*/}
                        {/*</div>*/}


                        <div className="row top-buffer-10">
                            <label htmlFor="selectedFiles" className="col-sm-2">Прикрепить:</label>
                            <Select
                                className="col-sm-10"
                                onChange={this.onFileDropdownSelected}
                                options={this.state.availableFiles}
                                value={this.state.selectedFilesValue}
                                autoFocus={true}
                                isMulti={true}
                            />
                        </div>

                        <div className="form-group top-buffer-10">
                            <button
                                className="btn btn-primary btn-block color-dark-blue"
                                disabled={this.state.loading || !this.state.content}
                            >
                                <span>Опубликовать комментарий</span>
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
                            style={{ display: "none" }}
                            ref={c => {this.checkBtn = c;}}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}