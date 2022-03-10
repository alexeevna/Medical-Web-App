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

class UserCardMessage extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
        this.unRead = this.props.unRead;
        console.log(this.unRead);
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                {this.user.initials !== null &&
                <TableCell className={classes.root}>

                    {this.user.initials + " "}


                </TableCell>}

                {this.user.initials === null &&
                <TableCell className={classes.cells} colSpan={2} align="right">
                    {this.user.username}
                </TableCell>
                }

                {
                    this.unRead > 0 && this.unRead
                }

            </React.Fragment>
        );
    }

}

export default withStyles(useStyles)(UserCardMessage)