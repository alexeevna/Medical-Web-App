import React, { Component } from "react";

import TestService from "../services/test.service";
import {Paper, Typography, withStyles} from "@material-ui/core";

const useStyles = theme => ({
    paper: {
        width: 800,
        margin: 'auto',
        padding: theme.spacing(3),
    },
    typography: {
        margin: theme.spacing(1,1,1,1),
    },
    typography2: {
        margin: theme.spacing(1,1,1,1),
        fontSize: 21,
    },
    div: {
        margin: theme.spacing(3,0,1,0),
    }
})

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        TestService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        const {classes} = this.props;
        return (
            <div className="container">
                <div className={classes.div}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" className={classes.typography}>
                            Medical-Web-App
                        </Typography>
                    </Paper>
                </div>

                <div className={classes.div}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.typography2}>
                            <i className="fa fa-check-circle top-buffer-10">  Храните анонимизированные медицинские DICOM-изображения</i>
                            <i className="fa fa-check-circle top-buffer-10">  Запускайте конвейеры с этими изображениями</i>
                            <i className="fa fa-check-circle top-buffer-10">  Создавайте и комментируйте посты с вопросами на интересующие Вас темы</i>
                        </Typography>
                    </Paper>
                </div>

            </div>
        );
    }
}


export default withStyles(useStyles)(Home)