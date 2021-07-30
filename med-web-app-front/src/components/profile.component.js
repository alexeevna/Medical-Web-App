import React, { Component } from "react";
import {Link, Route } from "react-router-dom";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";

import '../styles/Profile.css'
import Review from "./review.component"



export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.getUsername = this.getUsername.bind(this);

        this.state = {
            user: null,
            username: this.props.match.params.username,
            showReviews: true,
        };
    }

    getUser(username1) {
        ProfileService.getProfile(username1).then(
            response => {
                const user = response.data;
                this.refreshList();
                this.setState({
                    user: user,
                });
            })
            .catch((e) => {
            console.log(e);
        });
    }

    refreshList() {
        this.setState({
            user: null,
        });
    }

    getUsername(prevState, props) {
        return {
            username: props.match.params.username,
        };
    }

    setNewUsername() {
        this.setState(this.getUsername);
    }

    componentDidMount() {
        this.setNewUsername();
        this.getUser(this.props.match.params.username);
    }

    render() {
        if (this.props.match.params.username !== this.state.username) {
            this.setNewUsername();
            this.getUser(this.props.match.params.username);
        }
        const { user } = this.state;
        const { showReviews } = this.state;
        return (
            <div className="container">
                {user && <div className="row">
                    <div className="col-sm-9">
                        <header className="jumbotron align-center color-light-blue">
                            <h3><strong>Профиль</strong></h3>
                        </header>

                        <div className="card color-light-blue">
                            <div className="row top-buffer">
                                <div className="col-sm-5">Логин:</div>
                                <div className="col-sm-7">{user.username}</div>
                            </div>
                            <div className="row top-buffer">
                                <div className="col-sm-5">Дата регистрации:</div>
                                <div className="col-sm-7">{new Date(user.registeredDate).toLocaleDateString()}</div>
                            </div>
                        </div>

                        { showReviews && (
                            <Route component={Review}/>
                        )}

                    </div>
                    {user.username === AuthService.getCurrentUser().username &&
                    <div className="col-sm-2 align-center">
                        <Link to={"/files/view"} className="nav-link card-link-custom color-orange">
                            Мои файлы
                        </Link>
                        <Link to={"/files/upload"} className="nav-link card-link-custom color-orange">
                            Загрузить файл
                        </Link>
                    </div>}

                </div>}
            </div>
        );
    }
}