import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AttachmentService from "../services/attachment.service";
import {Link} from "react-router-dom";
import DicomAnonymizerService from "../services/dicom-anonymizer.service"

export default class UploadAttachmentsComponent extends Component {
    constructor(props) {
        super(props);

        this.selectFiles = this.selectFiles.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.upload = this.upload.bind(this);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            selectedFiles: undefined,
            progressInfos: [],
            message: [],

            fileInfos: [],
        };
    }

    selectFiles(event) {
        this.setState({
            progressInfos: [],
            selectedFiles: event.target.files,
        });
    }

    uploadFiles() {
        const selectedFiles = this.state.selectedFiles;

        let _progressInfos = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
        }

        this.setState(
            {
                progressInfos: _progressInfos,
                message: [],
            },
            () => {
                for (let i = 0; i < selectedFiles.length; i++) {
                    this.upload(i, selectedFiles[i]);
                }
            }
        );
    }

    async upload(idx, file) {
        let _progressInfos = [...this.state.progressInfos];
        let _currentUser = this.state.currentUser;

        let isDicom = file.name.includes(".dcm");
        if (isDicom) {
            try {
                var anonymizedDicomBlob = await DicomAnonymizerService.anonymizeInstance(file);
            } catch (error) {
                console.log(error)
                _progressInfos[idx].percentage = 0;
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Не удалось загрузить файл: " + file.name + ". \n Отсутствует Transfer Syntax tag (0002, 0010)"];
                    return {
                        progressInfos: _progressInfos,
                        message: nextMessage
                    };
                });
                return;
            }
        }

        let toSend = isDicom ? anonymizedDicomBlob : file;

        console.log(toSend);
        AttachmentService.uploadAttachment(toSend, file.name, isDicom,
            (event) => {
                _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
                this.setState({
                    _progressInfos,
            });
        })
            .then((response) => {
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Успешно загружен файл: " + file.name];
                    return {message: nextMessage};
                });

                return AttachmentService.getAttachmentsInfoForUser(_currentUser.username);
            })
            .then((files) => {
                this.setState({fileInfos: files.data,});
            })
            .catch(() => {
                _progressInfos[idx].percentage = 0;
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Не удалось загрузить файл: " + file.name];
                    return {
                        progressInfos: _progressInfos,
                        message: nextMessage
                    };
                });
            });
    }

    render() {
        const { selectedFiles, progressInfos, message } = this.state;

        return (

            <div className="row">
                <div className=" col-sm-9 align-content-center top-buffer-10">

                    <header className="jumbotron align-text-center color-light-blue">
                        <h3><strong>Загрузка файлов</strong></h3>
                    </header>

                    {progressInfos &&
                    progressInfos.map((progressInfo, index) => (
                        <div className="mb-2 center-horizontal width-600" key={index}>
                            <span>{progressInfo.fileName}</span>
                            <div className="progress">
                                <div
                                    className="progress-bar progress-bar-info color-orange"
                                    role="progressbar"
                                    aria-valuenow={progressInfo.percentage}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{ width: progressInfo.percentage + "%" }}
                                >
                                    {progressInfo.percentage}%
                                </div>
                            </div>
                        </div>
                    ))}


                    <div className="align-center view-card color-light-blue">
                        <div className="row top-buffer-10">
                            <div className="col-9">
                                <label className="btn color-light-blue">
                                    <input type="file" multiple onChange={this.selectFiles} />
                                </label>
                            </div>

                            <div className="col-3">
                                <button
                                    className="btn btn-primary btn-block color-middle-blue"
                                    disabled={!selectedFiles}
                                    onClick={this.uploadFiles}
                                >Загрузить</button>
                            </div>
                        </div>

                        {message.length > 0 && (
                            <div className="alert color-light-blue" role="alert">
                                <ul>
                                    {message.map((item, i) => {return <li key={i}>{item}</li>;})}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-sm-2 align-center">
                    <Link to={"/profile"} className="nav-link card-link-custom color-orange">Профиль</Link>
                    <Link to={"/files/view"} className="nav-link card-link-custom color-orange">Мои файлы</Link>
                </div>

                <div className="col-sm-1"></div>
            </div>
        );
    }
}