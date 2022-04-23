import React, {Component, useEffect, useState} from "react";
import '../../styles/Search.css'
import {Paper, TableCell, Typography, withStyles} from "@material-ui/core";
import {Link} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import AuthService from "../../services/auth.service";
import AttachmentService from "../../services/attachment.service";

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
    time: {
        color: '#888888',
        fontSize: 12,
        marginTop: theme.spacing(0.5),
        textAlign: "right"
        // marginBottom: 10
    },
});

function SenderMsg(props) {
    const {classes} = props;
    const {msg} = props;
    const {scrollToBottom} = props;
    const [files, setFiles] = useState([])
    useEffect(() => {
        getFiles()
        scrollToBottom()
    }, []);

    function getFiles() {
        console.log("ya tut -6")
        let preview = [];
        if (msg.attachments && msg.attachments.length > 0) {
            for (let i = 0; i < msg.attachments.length; i++) {
                if (msg.attachments[i].initialName) {
                    if (msg.attachments[i].initialName.endsWith(".jpg") ||
                        msg.attachments[i].initialName.endsWith(".png") ||
                        msg.attachments[i].initialName.endsWith(".dcm")) {

                        AttachmentService.getPreviewNew(msg.attachments[i].id).then(response => {

                            preview.push({id: msg.attachments[i].id, image: URL.createObjectURL(response.data)})

                            setFiles(preview)
                        }).catch(error => {
                            console.log(error);
                        })

                    }
                } else {
                    console.log("ya tut -5")
                    preview.push({id: null, image: URL.createObjectURL(msg.fileBlob)})

                    setFiles(preview)
                }
            }
        }
    }

    return (
        <Grid>
            <Paper className={classes.msgMy}>
                <Grid className={classes.txt}>{AuthService.getCurrentUser().initials}</Grid>
                <Grid>
                    <Grid>{msg.content}</Grid>
                    <Grid>
                        {files && files.map((file, index) => <img key={index} alt="" className="col-sm-12 top-buffer-10"
                                                                  src={file.image}/>)}
                    </Grid>
                </Grid>
                <Grid
                    className={classes.time}>
                    {
                        new Date(msg.sendDate).getHours() + ":"
                        + ((new Date(msg.sendDate).getMinutes() < 10 && "0" + new Date(msg.sendDate).getMinutes())
                            || (new Date(msg.sendDate).getMinutes() > 10 && new Date(msg.sendDate).getMinutes())
                        )
                    }
                </Grid>
            </Paper>
        </Grid>
    );

}

export default withStyles(useStyles)(SenderMsg)