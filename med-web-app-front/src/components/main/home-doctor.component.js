import React, {Component} from "react";
import {Container, Paper, Typography, withStyles} from "@material-ui/core";

const useStyles = theme => ({
    paper: {
        width: 700,
        margin: 'auto',
        padding: theme.spacing(3),
    },
    div: {
        margin: theme.spacing(3, 0, 1, 0),
    },
    typography: {
        margin: theme.spacing(1, 1, 1, 1),
    },
})

class HomeDoctor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    render() {
        const {classes} = this.props;
        return(
            <Container>
                <div className={classes.div}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" className={classes.typography}>
                            Medical-Web-App
                        </Typography>
                    </Paper>
                </div>

                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        Я врач
                    </Typography>
                </Paper>
            </Container>
        )
    }
}

export default withStyles(useStyles)(HomeDoctor)