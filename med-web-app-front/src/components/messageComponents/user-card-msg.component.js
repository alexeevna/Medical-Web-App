import React, {Component} from "react";
import '../../styles/Search.css'
import {Paper, TableCell, withStyles} from "@material-ui/core";
import {Link} from '@material-ui/core';

const useStyles = theme => ({
    root: {
        "& .MuiTypography-root": {
            color: "black",
            fontSize: 17
        },
    },
    noticeMsg: {
        backgroundColor: '#FF0040',
        textAlign: 'center',
        color: 'white',
        width: 25
    },
});

class UserCardMessage extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
        this.unRead = this.props.unRead;
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
                    <Paper className={classes.noticeMsg}>{this.unRead > 0 && this.unRead}</Paper>
                }

            </React.Fragment>
        );
    }

}

export default withStyles(useStyles)(UserCardMessage)