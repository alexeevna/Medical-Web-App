import React, {Component, useEffect, useState} from "react";
import '../../styles/Search.css'
import {ImageList, ImageListItem, Paper, TableCell, Typography, withStyles} from "@material-ui/core";
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
    useEffect(async () => {
        // setFiles([])
        let hey = await getFiles()
        scrollToBottom()
    }, [msg]);

    function hello() {
        console.log("hello в карточке")

    }

    async function getFiles() {
        setFiles([])
        console.log("получение файла, если есть")
        let preview = [];
        // const start = new Date().getTime();
        console.log(msg.attachments)
        if (msg.attachments && msg.attachments.length > 0) {
            for (let i = 0; i < msg.attachments.length; i++) {
                if (msg.attachments[i].initialName) {
                    if (msg.attachments[i].initialName.endsWith(".jpg") ||
                        msg.attachments[i].initialName.endsWith(".png") ||
                        msg.attachments[i].initialName.endsWith(".dcm")) {
                        const start = new Date().getTime();
                        const base64Data = msg.dataBlob[i]
                        const base64Response = await fetch(`data:application/json;base64,${base64Data}`)
                        const blob = await base64Response.blob()
                        preview.push({id: msg.attachments[i].id, image: URL.createObjectURL(blob)})
                        const end = new Date().getTime();
                        console.log(`SecondWay: ${end - start}ms`);
                        // setFiles(preview)
                        // const start = new Date().getTime();
                        // AttachmentService.getPreviewNew(msg.attachments[i].id).then(response => {
                        //     preview.push({id: msg.attachments[i].id, image: URL.createObjectURL(response.data)})
                        //
                        //     // setFiles(preview)
                        //     const end = new Date().getTime();
                        //     console.log(`SecondWay: ${end - start}ms`);
                        // }).catch(error => {
                        //     console.log(error);
                        // })

                    }
                } else {
                    preview.push({id: null, image: URL.createObjectURL(msg.fileBlob)})
                    // setFiles(preview)
                }
            }
        }
        // const end = new Date().getTime();
        // console.log(`SecondWay: ${end - start}ms`);
        setFiles(preview)
    }

    function preview(file, index) {
        console.log(file)
        console.log(index)
        return <div/>
        // if (msg.attachments && msg.attachments.length > 0) {
        //     for (let i = 0; i < msg.attachments.length; i++) {
        //         if (msg.attachments[i].initialName) {
        //             if (msg.attachments[i].initialName.endsWith(".jpg") ||
        //                 msg.attachments[i].initialName.endsWith(".png") ||
        //                 msg.attachments[i].initialName.endsWith(".dcm")) {
        //                 const start = new Date().getTime();
        //                 const base64Data = msg.dataBlob[i]
        //                 const base64Response = await fetch(`data:application/json;base64,${base64Data}`)
        //                 const blob = await base64Response.blob()
        //                 preview.push({id: msg.attachments[i].id, image: URL.createObjectURL(blob)})
        //                 const end = new Date().getTime();
        //                 console.log(`SecondWay: ${end - start}ms`);
        //                 setFiles(preview)
        //
        //             }
        //         } else {
        //             preview.push({id: null, image: URL.createObjectURL(msg.fileBlob)})
        //             setFiles(preview)
        //         }
        //     }
        // }
    }

    console.log("отрисовка сообщения")
    console.log(files)
    return (
        <Grid>
            <Paper className={classes.msgMy}>
                <Grid className={classes.txt}>{AuthService.getCurrentUser().initials}</Grid>
                <Grid>
                    <Grid>{msg.content}</Grid>
                    <Grid>
                        <ImageList sx={{width: 500, height: 450}} cols={3} rowHeight={164}>
                            {files && files.map((file, index) =>


                                <ImageListItem key={index}>
                                    <img
                                        src={spinner}
                                        srcSet={file.image}
                                        alt={file.id}
                                        loading="lazy"
                                    />
                                </ImageListItem>


                                // <img key={index} alt="" className="col-sm-12 top-buffer-10"
                                // src={file.image}/>
                            )}
                        </ImageList>
                    </Grid>
                    {/*<Grid>*/}
                    {/*    {msg.attachments && msg.attachments.length > 0 && msg.attachments.map((msg, index) => (*/}
                    {/*        <img key={index} alt=""*/}
                    {/*             className="col-sm-12 top-buffer-10"*/}
                    {/*             src={<ChatPreviewFile msg = {msg}/>}/>))}*/}
                    {/*</Grid>*/}
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