import React, {Component} from "react";
import '../styles/Search.css'
import {Link} from "react-router-dom";

export default class UserCard extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
    }

    render() {
        return (
            <Link to={"/profile/" + this.user.username} style={{ textDecoration: 'none', color: 'black'}}>

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
            </Link>
        )
    }
}