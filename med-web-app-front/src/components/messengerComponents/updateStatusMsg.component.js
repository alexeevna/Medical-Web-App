import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Paper, withStyles} from "@material-ui/core";

function UpdateStatusMsg(props) {
    const {updateStatusMsgBack} = props
    // const [refresh, setRefresh]= useState({})
    useEffect(() => {
        console.log("UpdateStatusMsg 2")
        updateStatusMsgBack()
        // setRefresh({})
    }, []);
    return (
        <div/>
    );
}

export default (UpdateStatusMsg)