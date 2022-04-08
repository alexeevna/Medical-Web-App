import React, {Component} from "react";
import '../../styles/Search.css'
import {Divider, Grid, Paper, TableCell, withStyles} from "@material-ui/core";
import {Link} from '@material-ui/core';

const useStyles = theme => ({
    root: {
        "& .MuiTypography-root": {
            color: "black",
            fontSize: 17
        },
    },
    gridText: {
        color: "black",
        fontSize: 15,
        fontWeight: 450,
        alignItems: "left"
    },
});

function UserCardMessage(props) {
    const {classes} = props
    const {user} = props
    return (
        <Grid item className={classes.gridText}>{user.initials + " "}</Grid>
    );
}

export default withStyles(useStyles)(UserCardMessage)