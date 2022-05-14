import React, {Component, useEffect, useState} from "react";
import '../../styles/Search.css'
import {ImageList, ImageListItem, Paper, TableCell, Typography, withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
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
        marginBottom: 10,
    },
    time: {
        color: '#888888',
        fontSize: 12,
        marginTop: theme.spacing(0.5),
        textAlign: "right"
        // marginBottom: 10
    },
    link: {
        color: "black",
    }
});

function SenderMsg(props) {
    const {classes} = props;
    const {msg} = props;
    const {scrollToBottom} = props;
    const [files, setFiles] = useState([])
    useEffect(async () => {
        // scrollToBottom()
        await getFiles()
        scrollToBottom()
    }, [msg]);

    async function getFiles() {
        setFiles([])
        let preview = [];
        // const start = new Date().getTime();
        if (msg.attachmentsBlobForImageClient && msg.attachmentsBlobForImageClient.length > 0) {
            for (let i = 0; i < msg.attachmentsBlobForImageClient.length; i++) {
                if (msg.attachmentsBlobForImageClient[i].name.endsWith(".jpg") ||
                    msg.attachmentsBlobForImageClient[i].name.endsWith(".png") ||
                    msg.attachmentsBlobForImageClient[i].name.endsWith(".dcm")
                ) {
                    console.log(msg.attachmentsBlobForImageClient[i])
                    preview.push({
                        id: msg.localFiles[i].id,
                        image: URL.createObjectURL(msg.attachmentsBlobForImageClient[i])
                    })
                }
            }
        } else if (msg.localFiles && msg.localFiles.length > 0) {
            for (let i = 0; i < msg.localFiles.length; i++) {
                if (msg.localFiles[i].fileName.endsWith(".jpg") ||
                    msg.localFiles[i].fileName.endsWith(".png")) {
                    const base64Data = msg.localFiles[i].fileContent
                    const base64Response = await fetch(`data:application/json;base64,${base64Data}`)
                    const blob = await base64Response.blob()
                    preview.push({id: msg.localFiles[i].id, image: URL.createObjectURL(blob)})
                }
            }
        } else if (msg.dataFilesDicom && msg.dataFilesDicom.length > 0) {
            for (let i = 0; i < msg.dataFilesDicom.length; i++) {
                const base64Data = msg.dataFilesDicom[i]
                const base64Response = await fetch(`data:application/json;base64,${base64Data}`)
                const blob = await base64Response.blob()
                console.log(blob)
                preview.push({id: msg.attachments[i].id, image: URL.createObjectURL(blob)})
            }
        }
        // const end = new Date().getTime();
        // console.log(`Работа на фронте: ${end - start}ms`);
        setFiles(preview)
    }

    return (
        <Grid>
            <Paper className={classes.msgMy}>
                <Grid className={classes.txt}>
                    <Link to={"/profile/" + msg.senderName} className={classes.link}>
                        {AuthService.getCurrentUser().initials}
                    </Link>

                </Grid>
                <Grid>
                    <Grid>{msg.content}</Grid>
                    {files &&
                    <Grid>
                        < ImageList cols={2} rowHeight={200} gap={3}>
                            {files.map((file, index) =>
                                <ImageListItem key={index}>
                                    <img
                                        src={file.image}
                                        srcSet={file.image}
                                        alt={file.id}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            )}
                        </ImageList>
                    </Grid>
                    }
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