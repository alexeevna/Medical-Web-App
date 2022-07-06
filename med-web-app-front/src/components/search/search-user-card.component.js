import React, {Component} from "react";
import '../../styles/Search.css'
import {TableCell, withStyles} from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = theme => ({
    root: {
        "& .MuiTypography-root": {
            color: "black",
            fontSize: 17
        },
    },
    link: {
        color: "black",
        fontSize: 17
    }
});

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                {this.user.initials !== null &&
                <TableCell >
                    <Link to={"profile/" + this.user.username} className={classes.link}>
                        {this.user.initials + " "}
                    </Link>

                </TableCell>}
                {this.user.initials !== null &&
                <TableCell  align="right">
                    <Link to={"profile/" + this.user.username} className={classes.link}>
                        {this.user.username}
                    </Link>
                </TableCell>
                }

                {this.user.initials === null &&
                <TableCell colSpan={2} align="right">
                    {this.user.username}
                </TableCell>
                }

                <TableCell  align="right">
                    {this.user.role}
                </TableCell>

            </React.Fragment>
        );
    }

}

export default withStyles(useStyles)(UserCard)