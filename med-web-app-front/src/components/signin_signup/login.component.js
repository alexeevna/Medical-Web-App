import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthService from "../../services/auth.service";
import {Card, withStyles} from "@material-ui/core";

const useStyles = theme => ({
    root: {
        "& .MuiFormLabel-root": {
            margin: 0
        }
    },
    div: {
        margin: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        marginTop: theme.spacing(8),
        // width: 500,
        minWidth: 300,
        minHeight: 300
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
        backgroundColor: '#3f51b5',
    },
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({
            message: "",
        });

        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.props.history.push("/records/view");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message || error.toString();
                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );

    }

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <Card className={classes.paper}>
                    <div className={classes.div}>
                        <Typography component="h1" variant="h5">
                            Вход
                        </Typography>
                        <form className={classes.form}
                              onSubmit={this.handleLogin}
                        >
                            <TextField
                                className={classes.root}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="login"
                                label="Логин"
                                name="login"
                                autoComplete="on"
                                autoFocus
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                            />
                            <TextField
                                className={classes.root}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                autoComplete="on"
                                label="Пароль"
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                            {/*    label="Запомнить"*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Войти
                            </Button>
                            {/*<Grid container>*/}
                            {/*    <Grid item xs>*/}
                            {/*        <Link href="#" variant="body2">*/}
                            {/*            Забыли пароль?*/}
                            {/*        </Link>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item>*/}
                            {/*        <Link href="#" variant="body2">*/}
                            {/*            {"Нет аккаунта? Зарегистрируйтесь."}*/}
                            {/*        </Link>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </Card>
            </Container>
        );
    }
}

export default withStyles(useStyles)(Login)