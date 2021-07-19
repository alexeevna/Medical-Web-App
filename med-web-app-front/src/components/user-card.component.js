import React, {Component} from "react";
import AuthService from "../services/auth.service";

export default class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            filePreviews: [],
        };
        console.log(props)
        console.log(this.props)
        console.log(this.props.username)
        this.username = this.props.username
        console.log("const")
    }

    render() {
        console.log("user-card")
        console.log(this.username)
        return (
            <div>
                <h1>{this.username}</h1>
            </div>
        )
    }
}