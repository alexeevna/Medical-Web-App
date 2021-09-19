import React, {Component} from "react";
import '../styles/Search.css'
import {TableCell, withStyles} from "@material-ui/core";
import {Link} from '@material-ui/core';

const useStyles = theme => ({
    root: {
        "& .MuiTypography-root": {
            color: "black",
            fontSize: 17
        },
    },
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
                <TableCell className={classes.root}>
                    <Link href={"profile/" + this.user.username}>
                        {this.user.initials + " "}
                    </Link>

                </TableCell>}
                {this.user.initials !== null &&
                <TableCell className={classes.root} align="right">
                    <Link href={"profile/" + this.user.username}>
                        {this.user.username}
                    </Link>
                </TableCell>
                }

                {this.user.initials === null &&
                <TableCell className={classes.cells} colSpan={2} align="right">
                    {this.user.username}
                </TableCell>
                }

                <TableCell className={classes.cells} align="right">
                    {this.user.role}
                </TableCell>

            </React.Fragment>
        );
    }

}

export default withStyles(useStyles)(UserCard)