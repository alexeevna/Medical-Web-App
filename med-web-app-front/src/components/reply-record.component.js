import React, {Component} from 'react';
import RecordService from "../services/record.service";
import AttachmentService from "../services/attachment.service";
import AuthService from "../services/auth.service";
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';


const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: 0,
        backgroundColor: '#01579b',
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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class ReplyRecordForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitReply = this.handleSubmitReply.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.handleFiles = this.handleFiles.bind(this);

        this.state = {
            content: "",
            availableFiles: [],
            selectedFilesId: null,
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

    handleFiles(e) {
        let filesIds = [];
        this.state.availableFiles.map(file => {
            if (e.target.value.indexOf(file.label) !== -1) {
                filesIds.push(file.value)
            }
        });
        this.setState({
            selectedFilesId: filesIds,
            selectedFilesValue: e.target.value
        })
    }

    handleSubmitReply(e) {
        e.preventDefault();

        RecordService.saveRecord(null, this.state.content, null, this.state.selectedFilesId, this.props.parentId).then(
            () => {
                this.setState({
                    submittedSuccessfully: true,
                    message: "Успешно опубликовано",
                    content: "",
                    selectedFilesId: [],
                    selectedFilesValue: [],
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

    }

    componentDidMount() {
        AttachmentService.getAttachmentsForUser(AuthService.getCurrentUser().username)
            .then(response => {
                    let filteredDicomsForSelect = response.data.map(el => {
                        return {value: el.id, label: el.initialName};
                    })
                    this.setState({
                        availableFiles: filteredDicomsForSelect
                    });
                },
                error => {
                    console.log(error);
                }
            );
    }

    render() {
        const {classes} = this.props;

        return (
            <Container component="main">
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>
                            Комментарий
                        </Typography>

                        <form className={classes.form}
                              onSubmit={this.handleSubmitReply}
                        >

                            <TextField
                                className={classes.root}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="content"
                                label="Содержание"
                                multiline
                                name="content"
                                autoComplete="off"
                                rows={4}
                                value={this.state.content}
                                onChange={this.onChangeContent}
                            />

                            <FormControl className={classes.formControl}>
                                <InputLabel id="selected-files">Прикрепить:</InputLabel>
                                <Select
                                    className={classes.root}
                                    multiple
                                    labelId="selected-files"
                                    value={this.state.selectedFilesValue}
                                    onChange={this.handleFiles}
                                    input={<Input id="select-multiple-chip-for-files"/>}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} className={classes.chip}/>
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >

                                    {this.state.availableFiles.map(x => (
                                        <MenuItem key={x.value} value={x.label} id={x.value}>
                                            {x.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Опубликовать комментарий
                            </Button>
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
                        </form>
                    </Paper>
                </main>
            </Container>
        )
    }
}

export default withStyles(useStyles)(ReplyRecordForm)