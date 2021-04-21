import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AttachmentService from "../services/attachment.service";

export default class BoardUploadAttachments extends Component {
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

    upload(idx, file) {
        let _progressInfos = [...this.state.progressInfos];

        AttachmentService.uploadAttachment(file, (event) => {
            _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
            this.setState({
                _progressInfos,
            });
        })
            .then((response) => {
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Uploaded the file successfully: " + file.name];
                    return {
                        message: nextMessage
                    };
                });

                //return AttachmentService.getFiles();
                return [];
            })
            .then((files) => {
                this.setState({
                    fileInfos: files.data,
                });
            })
            .catch(() => {
                _progressInfos[idx].percentage = 0;
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Could not upload the file: " + file.name];
                    return {
                        progressInfos: _progressInfos,
                        message: nextMessage
                    };
                });
            });
    }

    async componentDidMount(){
        // const response = await AttachmentService.getAttachmentsForUser(this.state.currentUser.username);
        // const userFilesInfo = response.data
        // console.log(userFilesInfo);
        // this.setState({userFilesInfo: userFilesInfo});
    }

    render() {
        const { selectedFiles, progressInfos, message, fileInfos } = this.state;

        return (
            <div>
                {progressInfos &&
                progressInfos.map((progressInfo, index) => (
                    <div className="mb-2" key={index}>
                        <span>{progressInfo.fileName}</span>
                        <div className="progress">
                            <div
                                className="progress-bar progress-bar-info"
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

                <div className="row my-3">
                    <div className="col-8">
                        <label className="btn btn-default p-0">
                            <input type="file" multiple onChange={this.selectFiles} />
                        </label>
                    </div>

                    <div className="col-4">
                        <button
                            className="btn btn-success btn-sm"
                            disabled={!selectedFiles}
                            onClick={this.uploadFiles}
                        >
                            Upload
                        </button>
                    </div>
                </div>

                {message.length > 0 && (
                    <div className="alert alert-secondary" role="alert">
                        <ul>
                            {message.map((item, i) => {
                                return <li key={i}>{item}</li>;
                            })}
                        </ul>
                    </div>
                )}

                <div className="card">
                    <div className="card-header">List of Files</div>
                    <ul className="list-group list-group-flush">
                        {fileInfos &&
                        fileInfos.map((file, index) => (
                            <li className="list-group-item" key={index}>
                                <a href={file.url}>{file.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}