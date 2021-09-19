import React, {Component} from "react";
import Select from 'react-select';
import AuthService from "../services/auth.service";
import PipelineService from "../services/pipeline.service"
import PipelineJobService from "../services/pipelinejob.service"
import AttachmentService from "../services/attachment.service"
import {Button, Divider, FormControl, Grid, Paper, Typography, withStyles} from "@material-ui/core";

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1),
        // display: 'flex',
    },
    paper2: {
        margin: theme.spacing(3),
        padding: theme.spacing(3),
    },
    mainGrid: {
        display: 'flex',
        minWidth: 1000,
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: 0,
        backgroundColor: '#3f51b5',
    },
    buttons: {
        width: 200,
        margin: theme.spacing(1),
        backgroundColor: '#f50057',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#ff5983',
            color: '#fff',
        }
    },
    root: {
        "& .MuiFormLabel-root": {
            margin: 0
        }
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    formControl: {
        "& .MuiFormLabel-root": {
            margin: 0
        },
        width: '100%',
    },
    grid: {
        margin: theme.spacing(1),
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
    title: {
        padding: theme.spacing(3),
    },
    content: {
        //margin: theme.spacing(1),
        padding: theme.spacing(1),
        marginLeft: 7,
    },
})

class PipelinesComponent extends Component {
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

        AttachmentService.getAttachmentsForUser(AuthService.getCurrentUser().username).then(
            response => {
                let filteredDicoms = response.data.filter(function (file) {
                    return file.initialName.includes(".dcm");
                });

                let filteredDicomsForSelect = filteredDicoms.map(el => {
                    return {value: el.id, label: el.initialName};
                })
                this.setState({
                    files: filteredDicomsForSelect
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
        this.setState({selectedPipeline: selectedValue.value});
    }

    onFileDropdownSelected(selectedValue) {
        this.setState({selectedFile: selectedValue.value});
    }

    submitPipeline() {
        PipelineJobService.sendRequestForPipelineJob(this.state.currentUser.username,
            this.state.selectedPipeline, this.state.selectedFile).then(
            response => {
            },
            error => {
                this.setState({
                    content: (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                });
            }
        )
        this.setState({submitted: true});
    }

    render() {
        const {pipelines, files, selectedFile, selectedPipeline, submitted} = this.state;
        const {classes} = this.props;

        return (
            <Grid className={classes.mainGrid}>
                <Grid container spacing={3}>
                    <Grid item xs />
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography component="h1" className={classes.title} variant="h4">
                                Запустить конвейер
                            </Typography>
                            <Divider/>

                            <form className={classes.form}
                                  onSubmit={this.submitPipeline}
                            >
                                <FormControl className={classes.formControl}>
                                    <Typography variant="h6" className={classes.content} color="inherit" noWrap>
                                        Тип конвейера
                                    </Typography>
                                    <Select className="col-9 col-offset-4"
                                            onChange={this.onPipelineDropdownSelected}
                                            options={pipelines}
                                            autoFocus={true}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <Typography variant="h6" className={classes.content} color="inherit" noWrap>
                                        Изображение
                                    </Typography>
                                    <Select className="col-9 col-offset-4"
                                            onChange={this.onFileDropdownSelected}
                                            options={files}
                                    />
                                </FormControl>
                            </form>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={selectedFile == null || selectedPipeline == null || submitted}
                                className={classes.button}
                            >
                                Запустить
                            </Button>

                            {this.state.submitted && (
                                <div className="form-group">
                                    <div
                                        className="alert alert-success top-buffer-10"
                                        role="alert">
                                        Отправлено исполняться <br/> Результаты можно посмотреть на вкладке
                                        "Запущенные
                                        конвейеры"
                                    </div>
                                </div>
                            )}
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper className={classes.paper2}>
                            <Grid className={classes.grid}>
                                <Button variant="contained" href="/files/view"
                                        className={classes.buttons}>
                                    Мои файлы
                                </Button>
                                <Button variant="contained" href="/files/upload" className={classes.buttons}>
                                    Загрузить файл
                                </Button>
                                <Button variant="contained" href="/pipelines/results" className={classes.buttons}>
                                    Запущенные конвейеры
                                </Button>
                                {this.state.currentUser !== null && this.state.currentUser.username === "alexandra" &&
                                (<Button href={"/pipelines/save"} className={classes.buttons}>
                                    Сохранить конфигурацию
                                </Button>)
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(useStyles)(PipelinesComponent)