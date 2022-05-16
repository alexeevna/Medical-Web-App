import React, {Component, useEffect, useRef, useState} from "react";
import '../../styles/Search.css'
import {
    Collapse,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    ImageList,
    ImageListItem,
    Paper,
    TableCell,
    Typography,
    withStyles
} from "@material-ui/core";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AuthService from "../../services/auth.service";
import AttachmentService from "../../services/attachment.service";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatService from "../../services/chat.service"
import {Select} from "@mui/material";
import Button from "@material-ui/core/Button";

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
    },
    collapsed: {
        marginTop: -3,
        marginLeft: 0,
        color: '#888888',
        float: "right",
        '&:hover': {
            cursor: "pointer",
        }
    },
    paperDelete: {
        '&:hover': {
            cursor: "pointer",
            textDecoration: 'underline'
        },
    }
});

function SenderMsg(props) {
    const {classes} = props
    const {msg} = props
    const {scrollToBottom} = props
    const {deleteMsgClient} = props
    const {selectUser} = props
    const {selectedUser} = props
    const {setRefresh} = props
    const [files, setFiles] = useState([])
    const [checked, setChecked] = useState(false)
    const [showPaper, setShowPaper] = useState(false)
    const [paperX, setPaperX] = useState(false)
    const [paperY, setPaperY] = useState(false)
    const [refresh2, setRefresh2] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const KeyboardArrowDownIconRef = useRef();
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

    function agreeToDelete() {
        console.log(msg)
        if (msg.id) {
            ChatService.deleteMsg(msg)
            setShowPaper(false)
            deleteMsgClient(msg)
        } else {
            selectUser(selectedUser)
            console.log(msg)
            // alert("точно удалить?")
            // setRefresh2({})
            // deleteMsg()
            // console.log(msg)
            // await ChatService.deleteMsg(msg)
            // await setShowPaper(false)
            // await deleteMsgClient(msg)
        }
        setOpenDialog(false)
    }

    function disagreeToDelete() {
        console.log("dis")
        setOpenDialog(false)
    }

    function deleteMsg() {
        setShowPaper(false)
        setOpenDialog(true)
    }

    function handleClick(e) {
        console.log(msg)
        if (!showPaper) {
            setPaperX(KeyboardArrowDownIconRef.current.getBoundingClientRect().x - 165)
            setPaperY(KeyboardArrowDownIconRef.current.getBoundingClientRect().y + 20)
            setShowPaper(true)
        } else {
            setShowPaper(false)
        }
    }
    console.log(msg.sendDate)
    console.log((new Date(msg.sendDate)).toString())
    return (
        <Grid>

            <Paper className={classes.msgMy} onMouseOver={(e) => setChecked(true)}
                   onMouseLeave={(e) => setChecked(false)}>
                <Grid>
                    <Grid style={{display: "flex"}}>
                        <Grid className={classes.txt}>
                            <Link to={"/profile/" + msg.senderName} className={classes.link}>
                                {AuthService.getCurrentUser().initials}
                            </Link>
                        </Grid>
                        <Grid>
                            <Collapse in={checked}>
                                <KeyboardArrowDownIcon onClick={(e => handleClick(e))} ref={KeyboardArrowDownIconRef}
                                                       className={classes.collapsed}/>
                            </Collapse>
                            {showPaper &&
                            <Paper className={classes.paperDelete} style={{
                                position: "absolute",
                                left: paperX,
                                top: paperY,
                                backgroundColor: '#eeeeee',
                                padding: 1.5
                            }}
                                   onClick={deleteMsg}
                            > Удалить сообщение у
                                всех </Paper>}
                            <Dialog
                                open={openDialog}
                                onClose={disagreeToDelete}
                            >
                                <DialogContent>
                                    <DialogContentText>
                                        Вы уверены, что хотите удалить сообщение?
                                    </DialogContentText>
                                    <DialogActions>
                                        <Button onClick={disagreeToDelete}>Нет</Button>
                                        <Button onClick={agreeToDelete}>
                                            Да
                                        </Button>
                                    </DialogActions>
                                </DialogContent>
                            </Dialog>
                        </Grid>
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
                            (((new Date(msg.sendDate).getHours() < 10 && "0" + new Date(msg.sendDate).getHours())
                                    || (new Date(msg.sendDate).getHours() >= 10 && new Date(msg.sendDate).getHours())) + ":"
                                + ((new Date(msg.sendDate).getMinutes() < 10 && "0" + new Date(msg.sendDate).getMinutes())
                                    || (new Date(msg.sendDate).getMinutes() > 10 && new Date(msg.sendDate).getMinutes())
                                )) + "    " + (
                                ((new Date(msg.sendDate).getDate() < 10 && "0" + new Date(msg.sendDate).getDate()) || (new Date(msg.sendDate).getDate() >= 10 && new Date(msg.sendDate).getDate()))
                                + "."
                                + (((new Date(msg.sendDate).getMonth() + 1) < 10 && "0" + (new Date(msg.sendDate).getMonth() + 1)) || (((new Date(msg.sendDate).getMonth() + 1) >= 10 && (new Date(msg.sendDate).getMonth() + 1))))
                                + "." + new Date(msg.sendDate).getFullYear()
                            )
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );

}

export default withStyles(useStyles)(SenderMsg)