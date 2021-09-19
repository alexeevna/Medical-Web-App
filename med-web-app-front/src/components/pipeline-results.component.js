import React, {Component} from "react";
import AuthService from "../services/auth.service";
import PipelineJobService from "../services/pipelinejob.service"
import AttachmentService from "../services/attachment.service"
import {Card, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = theme => ({
    button: {
        width: 200,
        margin: theme.spacing(1),
        backgroundColor: '#f50057',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#ff5983',
            color: '#fff',
        }
    },
    mainGrid: {
        display: 'flex',
        minWidth: 1000,
    },
    paper: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        padding: theme.spacing(1),
        color: "black",
        // display: 'flex',
    },
    paper2: {
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        color: "black",
    },
    grid: {
        margin: theme.spacing(1),
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
})

class PipelineResultsComponent extends Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
        this.updatePipelineResults = this.updatePipelineResults.bind(this);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            pipelineJobs: [],
            message: ""
        };
    }

    componentDidMount() {
        this.updatePipelineResults();
        setInterval(() => this.updatePipelineResults(), 3000);
    }

    updatePipelineResults() {
        PipelineJobService.getPipelineJobsForUser(AuthService.getCurrentUser().username).then(
            response => {
                let jobs = [];
                response.data.forEach(el => {
                    let inputFileName = (el.inputFiles !== undefined && el.inputFiles !== null && el.inputFiles.length > 0)
                        ? el.inputFiles[0].initialName : "";
                    let outputFileName = el.outputFile !== undefined && el.outputFile !== null ? el.outputFile.initialName : "";
                    let outputFileId = el.outputFile !== undefined && el.outputFile !== null ? el.outputFile.id : "";
                    let pipelineDescription = el.pipeline !== undefined && el.pipeline !== null ? el.pipeline.description : "";
                    let job = {
                        id: el.id,
                        pipelineName: pipelineDescription,
                        status: el.executionStatus,
                        inputName: inputFileName,
                        outputName: outputFileName,
                        outputId: outputFileId
                    };
                    jobs.push(job);
                })

                this.setState({
                    pipelineJobs: jobs
                });
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

    translateStatus(status) {
        if (status === 'COMPLETED_ERROR') {
            return 'Ошибка';
        }
        if (status === 'COMPLETED_OK') {
            return 'Успешно';
        }
        if (status === 'IN_PROGRESS') {
            return 'Выполняется';
        }
    }

    render() {
        const {pipelineJobs} = this.state;
        const {classes} = this.props
        return (
            <div>
                <Grid xs={12} item className={classes.mainGrid}>
                    <Grid xs={8} item>
                        <Card className={classes.paper}>
                            <div className="row">
                                <div className=" col-sm-9 align-content-center top-buffer-10">

                                    <header className="jumbotron align-text-center color-light-blue">
                                        <h3><strong>Результаты:</strong></h3>
                                    </header>

                                    <div className="pipeline-results-card color-light-blue">
                                        {pipelineJobs.map(el => (
                                            <div key={el.id}
                                                 className="row color-light-blue top-buffer-10 bordered-box">
                                                <div className="col-sm-3 line-break">{el.pipelineName}</div>
                                                <div className="col-sm-3 line-break">{el.inputName}</div>
                                                <div className="col-sm-3">{this.translateStatus(el.status)}</div>
                                                <div className="col-sm-3">
                                                    <button
                                                        className="btn btn-primary btn-block color-dark-blue"
                                                        disabled={el.status !== 'COMPLETED_OK'}
                                                        onClick={() => this.download(el.outputId, el.outputName)}>Скачать
                                                        результат
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <div className="col-sm-1"></div>
                            </div>
                        </Card>
                    </Grid>
                    <Grid xs={4} item>
                        <Card className={classes.paper2}>
                            <Grid className={classes.grid}>
                                <Button href={"/pipelines/create"} className={classes.button}>
                                    Запустить конвейеры
                                </Button>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(PipelineResultsComponent)