import React, {Component} from "react";

import {Grid, Paper, Typography, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = theme => ({
    paper: {
        width: 700,
        margin: 'auto',
        padding: theme.spacing(3),
    },
    typography: {
        margin: theme.spacing(1, 1, 1, 1),
    },
    typography2: {
        margin: theme.spacing(1, 1, 1, 1),
        fontSize: 17,
    },
    div: {
        margin: theme.spacing(3, 0, 1, 0),
    },
    button: {
        marginRight: theme.spacing(1),
    },
})

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    // componentDidMount() {
    //     TestService.getPublicContent().then(
    //         response => {
    //             this.setState({
    //                 content: response.data
    //             });
    //         },
    //         error => {
    //             this.setState({
    //                 content:
    //                     (error.response && error.response.data) ||
    //                     error.message ||
    //                     error.toString()
    //             });
    //         }
    //     );
    // }

    render() {
        const {classes} = this.props;
        return (
            <Grid>
                <div className={classes.div}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" className={classes.typography}>
                            Medical-Web-App
                        </Typography>
                    </Paper>
                </div>

                {/*
                <div className={classes.div}>
*/}
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                        Medical web app — сервис для получения второго мнения по результатам КТ, МРТ и ПЭТ исследований.
                        <br/> <br/>
                        В каких случаях может понадобиться повторный анализ и расшифровка результатов КТ, МРТ и
                        ПЭТ: <br/>
                        – подтверждение необходимости хирургического вмешательства<br/>
                        – подтверждение онкологического или редкого заболевания<br/>
                        – проверка эффективности назначенной терапии<br/>
                        – сомнения пациента относительно корректности поставленного диагноза<br/>
                        – консультация специалиста узкого профиля <br/> <br/>
                    </Typography>

                    <Grid
                        container
                        justifyContent="center">
                        <Link to={"/home/patient"} style={{textDecoration: 'none'}}>
                            <Button variant="contained"
                                    color="secondary"
                                    className={classes.button}>
                                <Typography variant="h6">
                                    Я пациент
                                </Typography>
                            </Button>
                        </Link>
                        {/*<Button*/}
                        {/*    variant="contained"*/}
                        {/*    color="secondary"*/}
                        {/*    className={classes.button}*/}
                        {/*    href="home/patient"*/}
                        {/*>*/}
                        {/*    <Typography variant="h6">*/}
                        {/*        Я пациент*/}
                        {/*    </Typography>*/}
                        {/*</Button>*/}
                        <Link to={"/home/doctor"} style={{textDecoration: 'none'}}>
                            <Button variant="contained"
                                    color="secondary"
                                    className={classes.button}>
                                <Typography variant="h6">
                                    Я врач
                                </Typography>
                            </Button>
                        </Link>
                        {/*<Button*/}
                        {/*    variant="contained"*/}
                        {/*    color="secondary"*/}
                        {/*    className={classes.button}*/}
                        {/*    href="home/doctor"*/}

                        {/*    >*/}
                        {/*        <Typography variant="h6">*/}
                        {/*            Я врач*/}
                        {/*        </Typography>*/}
                        {/*    </Button>*/}
                    </Grid>
                </Paper>
                {/*</div>*/}

            </Grid>
        )
    }
}


export default withStyles(useStyles)(Home)