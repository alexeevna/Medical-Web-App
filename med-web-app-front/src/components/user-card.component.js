import React, {Component} from "react";
import AuthService from "../services/auth.service";

export default class UserCard extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        console.log(this.props)
        console.log(this.props.username)
        this.user = this.props.user
        console.log("const")
    }

    render() {
        console.log("user-card")
        console.log(this.user.username)
        return (
            <div>
                <h1>{this.user.username}</h1>
            </div>
        )
    }
}