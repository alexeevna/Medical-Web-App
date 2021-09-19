import React, {Component} from "react";
import '../styles/Search.css'
import {Link, TableCell, withStyles} from "@material-ui/core";

const useStyles = theme => ({
    cells: {

        fontSize: 17
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
                <TableCell className={classes.cells}>
                    <Link href={"profile/" + this.user.username}>

                    </Link>
                        {this.user.initials + " "}
                </TableCell>}
                {this.user.initials !== null &&
                <TableCell className={classes.cells} align="right">
                    {this.user.username}
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
