import React, {Component} from "react";
import '../styles/Search.css'

export default class UserCard extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user
    }

    render() {
        return (
            <React.Fragment>
                {this.user.initials !== null &&
                <td className="td-search">
                    {this.user.initials + " "}
                </td>}
                {this.user.initials !== null &&
                <td className="td-search">
                    {this.user.username}
                </td>
                }

                {this.user.initials === null &&
                <td colSpan="2" className="td-search">
                    {this.user.username}
                </td>
                }

                <td className="td-search">
                    {this.user.role}
                </td>
            </React.Fragment>
        )
    }
}