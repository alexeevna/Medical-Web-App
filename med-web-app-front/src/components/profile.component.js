import React, { Component } from "react";
import { Route } from "react-router-dom";
import AuthService from "../services/auth.service";

import '../styles/Profile.css'
import {Link} from "react-router-dom";
import Review from "./review.component"

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            showReviews: true,
        };
    }

    render() {
        const { currentUser } = this.state;
        const { showReviews } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <header className="jumbotron align-center color-light-blue">
                            <h3><strong>Мой профиль</strong></h3>
                        </header>

                        <div className="card color-light-blue">
                            <div className="row top-buffer">
                                <div className="col-sm-5">Логин:</div>
                                <div className="col-sm-7">{currentUser.username}</div>
                            </div>
                            <div className="row top-buffer">
                                <div className="col-sm-5">Дата регистрации:</div>
                                <div className="col-sm-7">{new Date(currentUser.registeredDate).toLocaleDateString()}</div>
                            </div>
                        </div>

                        { showReviews && (
                            <div className="jumbotron align-center color-light-blue">
                                <Route component={Review}/>
                            </div>
                        )}

                    </div>
                    <div className="col-sm-2 align-center">
                        <Link to={"/files/view"} className="nav-link card-link-custom color-orange">
                            Мои файлы
                        </Link>
                        <Link to={"/files/upload"} className="nav-link card-link-custom color-orange">
                            Загрузить файл
                        </Link>
                    </div>

                    <div className="col-sm-1"/>
                </div>
            </div>
        );
    }
}