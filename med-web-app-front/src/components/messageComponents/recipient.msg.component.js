import React, {Component, useEffect} from "react";
import '../../styles/Search.css'
import {Paper, TableCell, withStyles} from "@material-ui/core";
import {Link} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

const useStyles = theme => ({

    msgNotMy: {
        width: "fit-content",
        height: "fit-content",
        margin: 20,
        padding: theme.spacing(0.5),
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        maxWidth: 400,
        elevation: 2
    },
    txt: {
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 10
    },

});

function RecipientMsg(props) {
    const {classes} = props;
    const {msg} = props;
    const {updateStatusMsg} = props
    useEffect(() => {
        updateStatusMsg(msg);
    }, []);
    return (
        <Grid>
            <Paper className={classes.msgNotMy}>
                <Grid className={classes.txt}>{msg.senderName}</Grid>
                {msg.content}
            </Paper>
        </Grid>
    );

}

export default withStyles(useStyles)(RecipientMsg)