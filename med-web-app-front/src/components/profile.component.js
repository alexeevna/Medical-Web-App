import React, { Component } from "react";
import AuthService from "../services/auth.service";

import '../styles/Profile.css'
import {Link} from "react-router-dom";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-10">
                        <header className="jumbotron align-center color-light-blue">
                            <h3><strong>Мой профиль</strong></h3>
                        </header>

                        <div className="card color-light-blue">
                            <div className="row top-buffer">
                                <div className="col-sm-4">Логин:</div>
                                <div className="col-sm-8">{currentUser.username}</div>
                            </div>
                            <div className="row top-buffer">
                                <div className="col-sm-4">Имя, фамилия:</div>
                                <div className="col-sm-8">{currentUser.realName}</div>
                            </div>
                            <div className="row top-buffer">
                                <div className="col-sm-4">Статус:</div>
                                {/*<div className="col-sm-8" v-if="currentUser.roles[0] === 'driver'">Перевозчик</div>*/}
                                {/*<div className="col-sm-8" v-if="currentUser.roles[0] === 'client'">Заказчик</div>*/}
                            </div>
                            <div className="row top-buffer">
                                <div className="col-sm-4">Моб. номер:</div>
                                <div className="col-sm-8">{currentUser.mobilePhone}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2 align-center">
                        <Link to={"/files/view"} className="nav-link card-link-custom color-orange">
                            Мои файлы
                        </Link>
                        <Link to={"/files/upload"} className="nav-link card-link-custom color-orange">
                            Загрузить файл
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}