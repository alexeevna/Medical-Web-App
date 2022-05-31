import React from "react";
import '../../styles/Search.css'
import {Grid, withStyles} from "@material-ui/core";

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
    const nameAndSurname = user.initials.split(" ")
    return (
        <Grid item className={classes.gridText}>{nameAndSurname[0] + " " + nameAndSurname[1] + " "}</Grid>
    );
}

export default withStyles(useStyles)(UserCardMessage)