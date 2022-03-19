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
    grid: {
        color: "black",
        fontSize: 17,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10
    }
});

function UserCardMessage(props) {
    const {classes} = props
    const {user} = props
    return (


            <Grid className={classes.grid}>
                {user.initials + " "}
            </Grid>

    );
}

export default withStyles(useStyles)(UserCardMessage)