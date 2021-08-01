import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../styles/Search.css'
import {FormControl, FormLabel, Radio, RadioGroup, withStyles} from "@material-ui/core";
import AuthService from "../services/auth.service";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// const required = value => {
//     if (!value) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 Нужно заполнить это поле!
//             </div>
//         );
//     }
// };

// const email = value => {
//     if (!isEmail(value)) {
//         return (
//             <div className="alert alert-danger" role="alert">
//                 This is not a valid email.
//             </div>
//         );
//     }
// };

// const theme = createMuiTheme({
//     palette: {
//         primary: {
//             main: '#1B435D',
//         },
//         secondary: {
//             main: '#1B435D',
//         },
//     },
// });

const useStyles = theme => ({
    // button: {
    //     backgroundColor: theme.palette.primary.main,
    // },
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
    radio: {
        marginBottom: theme.spacing(1)
    },
    label: {
        margin: theme.spacing(2, 0, 1)
    }
});

class Register extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.vusername = this.vusername.bind(this)
        this.vpassword = this.vpassword.bind(this)

        this.state = {
            username: "",
            firstname: null,
            lastname: null,
            // email: "",
            password: "",
            chosenRole: "Пользователь",
            successful: false,
            message: "",
            usernameError: false,
            passwordError: false,
            validateForm: false
        };
    }

    vusername = value => {
        console.log("vusername")
        if (value.length < 3 || value.length > 25) {
            // return (
            //     <div className="alert alert-danger" role="alert">
            //         Имя должно содержать от 3 до 25 символов.
            //     </div>
            // );
            this.setState({
                usernameError: true
            })
        } else {
            this.setState({
                usernameError: false
            })
        }
    };

    vpassword = value => {
        console.log("vpassword")
        if (value.length < 6 || value.length > 40) {
            // return (
            //     <div className="alert alert-danger" role="alert">
            //         Пароль должен быть не менее 6 символов.
            //     </div>
            // );
            this.setState({
                passwordError: true
            })
        } else {
            this.setState({
                passwordError: false
            })
        }

    };

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
        this.vusername(e.target.value)
    }

    // onChangeEmail(e) {
    //     this.setState({
    //         email: e.target.value
    //     });
    // }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
        this.vpassword(e.target.value)
    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeRole(e) {
        this.setState({
            chosenRole: e.target.value
        });
        console.log(e.target.value)
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        // this.form.validateAll();
        let initials = null
        if (this.state.lastname !== null && this.state.firstname !== null) {
            initials = this.state.lastname + " " + this.state.firstname
        } else if (this.state.lastname !== null) {
            initials = this.state.lastname
        } else if (this.state.firstname !== null) {
            initials = this.state.firstname
        }
        if (!this.state.usernameError && !this.state.passwordError) {
            AuthService.register(
                this.state.username,
                initials,
                this.state.firstname,
                this.state.lastname,
                // this.state.email,
                this.state.password,
                this.state.chosenRole,
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {/*<LockOutlinedIcon/>*/}
                        MED
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <form className={classes.form}
                          onSubmit={this.handleRegister}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    id="firstName"
                                    label="Имя"
                                    autoFocus
                                    value={this.state.firstname}
                                    onChange={this.onChangeFirstname}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="lastName"
                                    label="Фамилия"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={this.state.lastname}
                                    onChange={this.onChangeLastname}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Логин"
                                    name="username"
                                    autoComplete="username"
                                    error={this.state.usernameError}
                                    helperText={this.state.usernameError && "Логин должен быть не менее 3 символов"}
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    // validations={[required, vusername]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={this.state.passwordError}
                                    helperText={this.state.passwordError && "Пароль должен быть не менее 6 символов"}
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    // validations={[required, vpassword]}
                                />
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*    <FormControlLabel*/}
                            {/*        control={<Checkbox value="allowExtraEmails" color="primary"/>}*/}
                            {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                        </Grid>
                        <FormControl>
                            <FormLabel className={classes.label}>Выберите роль:</FormLabel>
                            <RadioGroup value={this.state.chosenRole} onChange={this.onChangeRole}>
                                <FormControlLabel className={classes.radio} control={<Radio/>} value="Пользователь"
                                                  label="Пользователь"/>
                                <FormControlLabel className={classes.radio} control={<Radio/>} value="Врач"
                                                  label="Врач"/>
                            </RadioGroup>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // onClick={this.handleRegister}
                            className={classes.submit}
                        >
                            Зарегистрироваться
                        </Button>
                        {/*<Grid container justifyContent="flex-end">*/}
                        {/*    <Grid item>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            Already have an account? Sign in*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        {/*<CheckButton*/}
                        {/*    style={{display: "none"}}*/}
                        {/*    ref={c => {*/}
                        {/*        this.checkBtn = c;*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }
}

export default withStyles(useStyles)(Register)