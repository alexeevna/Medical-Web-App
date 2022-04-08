import React, {Component, useEffect} from "react";
import '../../styles/Search.css'
import {Paper, TableCell, withStyles} from "@material-ui/core";
import {Link} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

const useStyles = theme => ({

    msgMy: {
        width: "fit-content",
        height: "fit-content",
        margin: 20,
        marginLeft: "auto",
        backgroundColor: '#a1e9ff',
        padding: theme.spacing(0.5),
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        maxWidth: 400,
    },
    txt: {
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 10
    },

});

function SenderMsg(props) {
    const {classes} = props;
    const {msg} = props;
    const {scrollToBottom} = props;
    useEffect(() => {
        scrollToBottom()
    }, []);
    return (
        <Grid>
            <Paper className={classes.msgMy}>
                <Grid className={classes.txt}>{msg.senderName}</Grid>
                {msg.content}
            </Paper>
        </Grid>
    );

}

export default withStyles(useStyles)(SenderMsg)