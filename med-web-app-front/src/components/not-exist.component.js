import React, { Component } from "react";

export default class NotExist extends Component {
    render() {
        return (
            <div className="container" style={{fontSize:18,textAlign: "center"}}>
                <div style={{fontSize: 170, align: "center"}}>
                    404
                </div>
                Данной страницы не существует
            </div>
        )
    }
}