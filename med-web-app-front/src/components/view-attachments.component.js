import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AttachmentService from "../services/attachment.service";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";

const useStyles = theme => ({
    button: {
        width: 200,
        margin: theme.spacing(1),
        backgroundColor: '#f50057',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#ff5983',
            color: '#fff',
        }
    },
})

class ViewAttachmentsComponent extends Component {
    constructor(props) {
        super(props);

        this.download = this.download.bind(this);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            userFilesInfo: []
        };
    }

    async componentDidMount(){
        const response = await AttachmentService.getAttachmentsForUser(this.state.currentUser.username);
        const userFilesInfo = response.data;
        this.setState({userFilesInfo: userFilesInfo});
    }

    download(fileId, initialFileName) {
        AttachmentService.downloadAttachment(fileId, initialFileName);
    }


    render() {
        // const { currentState } = this.state;
        const {classes} = this.props;
        return (
            <div className="container">

                <div className="row">
                    <div className="col-sm-9">
                        <header className="jumbotron align-center color-light-blue">
                            <h3><strong>Загруженные файлы</strong></h3>
                        </header>

                        <div className="view-card color-light-blue">
                            {this.state.userFilesInfo.map(el => (
                                <div key={el.id} className="row color-light-blue top-buffer-10">
                                    <div className="col-sm-5 line-break">{el.initialName}</div>
                                    <div className="col-sm-4">{new Date(el.creationTime).toLocaleDateString()}</div>
                                    <div className="col-sm-3">
                                        <button
                                            className="btn btn-primary btn-block color-dark-blue"
                                            onClick={() => this.download(el.id, el.initialName)}>Скачать</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-sm-2 align-center">
                        <Button variant="contained" href={"/profile/" + AuthService.getCurrentUser().username} className={classes.button}>
                            Профиль
                        </Button>
                        <Button variant="contained" href="/files/upload" className={classes.button}>
                            Загрузить файл
                        </Button>
                        {/*<Link to={"/profile/" + AuthService.getCurrentUser().username} className="nav-link card-link-custom color-orange">*/}
                        {/*    Профиль*/}
                        {/*</Link>*/}
                        {/*<Link to={"/files/upload"} className="nav-link card-link-custom color-orange">*/}
                        {/*    Загрузить файл*/}
                        {/*</Link>*/}
                    </div>

                    <div className="col-sm-1"></div>
                </div>

            </div>
        );
    }
}

export default withStyles(useStyles)(ViewAttachmentsComponent)