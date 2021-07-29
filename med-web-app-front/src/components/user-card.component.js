import React, {Component} from "react";
import '../styles/Search.css'

export default class UserCard extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user
    }

    render() {
        return (
            <div>
                {this.user.initials !== null &&
                <td className="td-search-notnullInitials">
                    {this.user.initials + " "}
                </td>}
                {this.user.initials !== null &&
                <td className="td-search-notnullInitials">
                    {this.user.username}
                </td>
                }

                {this.user.initials === null &&
                <td className="td-search-nullInitials">
                    {this.user.username}
                </td>
                }

                <td className="td-search-role">
                    {this.user.role}
                </td>
            </div>
        )
    }
}