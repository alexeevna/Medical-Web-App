import React, {Component} from "react";

import TestService from "../services/test.service";
import {Grid, Paper, Typography, withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const useStyles = theme => ({
    paper: {
        width: 700,
        margin: 'auto',
        padding: theme.spacing(3),
    },
    typography: {
        margin: theme.spacing(1, 1, 1, 1),
    },
    typography2: {
        margin: theme.spacing(1, 1, 1, 1),
        fontSize: 17,
    },
    div: {
        margin: theme.spacing(3, 0, 1, 0),
    },
    button: {
        marginRight: theme.spacing(1),
    },
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
            <Grid>
                <div className={classes.div}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" className={classes.typography}>
                            Medical-Web-App
                        </Typography>
                    </Paper>
                </div>

{/*
                <div className={classes.div}>
*/}
                <Paper className={classes.paper}>
                    <Grid
                        container
                        justifyContent="center">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            href="home/patient"
                        >
                            <Typography variant="h6">
                                Я пациент
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            href="home/doctor"

                            >
                                <Typography variant="h6">
                                    Я врач
                                </Typography>
                            </Button>
                        </Grid>
                    </Paper>
                {/*</div>*/}

            </Grid>
        )
    }
}


export default withStyles(useStyles)(Home)