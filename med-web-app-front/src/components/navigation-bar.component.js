import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";
import React, {Component} from "react";

export default class navigationBar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            AuthService.checkTokenIsExpired(user.token)
                .then(response => {
                    this.setState({
                        currentUser: user
                    });
                })
                .catch(error => {
                        this.logOut();
                    }
                )
        }
    }

    logOut() {
        AuthService.logout();
        this.setState({currentUser: null});
    }

    render() {
        const { currentUser } = this.state;
        return (
            <nav className="navbar navbar-expand color-dark-blue">
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link color-dark-blue">
                            Главная
                        </Link>
                    </li>

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/pipelines/create"} className="nav-link color-dark-blue">
                                Конвейеры
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/records/view"} className="nav-link color-dark-blue">
                                Посты
                            </Link>
                        </li>
                    )}

                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/search"} className="nav-link color-dark-blue">
                                Поиск
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to={"/profile/" + AuthService.getCurrentUser().username}
                                className="nav-link color-dark-blue"
                            >
                                Мой Профиль
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link color-dark-blue" onClick={this.logOut}>
                                Выйти
                            </Link>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link color-dark-blue">
                                Войти
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link color-dark-blue">
                                Зарегистрироваться
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
        )
    }
}