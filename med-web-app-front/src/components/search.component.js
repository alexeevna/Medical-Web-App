import React, {Component} from "react";
import '../styles/Search.css'
import UserService from "../services/user.service";
import UserCard from "./user-card.component";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {FormControl, FormLabel, Radio, RadioGroup, withStyles} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SearchIcon from '@material-ui/icons/Search';


const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#e0e0e0",
        },
    },
}))(TableRow);

const useStyles = theme => ({
    root: {
        "& .MuiPaper-root": {
            width: 800,
            backgroundColor: '#ffffff'
        },
        "& .MuiTableRow-root": {
            color: "black",
        }
    },
    header: {
        backgroundColor: '#3f51b5',
        color: 'white',
        fontSize: 17
    },
    table: {
        width: 800,
    },
    formControlLab: {
        marginBottom: theme.spacing(0),
    },
    label: {
        margin: theme.spacing(2, 0, 1),
        color: "black"
    }
});


class Search extends Component {
    constructor(props) {
        super(props);
        this.getUsers = this.getUsers.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeParamsTypeSearch = this.onChangeParamsTypeSearch.bind(this)
        this.onChangeParamsRoleSearch = this.onChangeParamsRoleSearch.bind(this)
        this.state = {
            searchParamsType: "login",
            searchParamsRole: "Все",
            searchString: "",
            users: [],
        };
    }

    onChangeUsername(e) {
        const searchString = e.target.value;
        this.setState({
            searchString: searchString,
        });
    }

    onChangeParamsTypeSearch(e) {
        this.setState({
            searchParamsType: e.target.value
        });
    }

    onChangeParamsRoleSearch(e) {
        this.setState({
            searchParamsRole: e.target.value
        });
    }

    getUsers() {
        const {searchString} = this.state
        if (this.state.searchParamsType === "login" && this.state.searchParamsRole === "Все") {
            UserService.getAllByUsername(searchString)
                .then((response) => {
                    const users = response.data;
                    this.refreshList();
                    this.setState({
                        users: users,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        } else if (this.state.searchParamsType === "login") {
            UserService.getByUsername(searchString, this.state.searchParamsRole)
                .then((response) => {
                    const users = response.data;
                    this.refreshList();
                    this.setState({
                        users: users,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        } else if (this.state.searchParamsType === "initials" && this.state.searchParamsRole === "Все") {
            UserService.getAllByInitials(searchString)
                .then((response) => {
                    const users = response.data;
                    this.refreshList();
                    this.setState({
                        users: users,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            UserService.getByInitials(searchString, this.state.searchParamsRole)
                .then((response) => {
                    const users = response.data;
                    this.refreshList();
                    this.setState({
                        users: users,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }

    refreshList() {
        this.setState({
            users: [],
        });
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className="div-search">
                    <form className="form-search">
                        <input className="input-search"
                               type="text"
                               placeholder="Искать здесь..."
                               value={this.state.searchString}
                               onChange={this.onChangeUsername}
                        />
                        <button className="button-search"
                                type="button"
                                onClick={this.getUsers}
                        >
                            {/*<i className="fa fa-search" aria-hidden="true"/>*/}
                            <SearchIcon style={{ color: "white" }} />
                        </button>
                    </form>
                </div>
                <div className="div-search">
                    <FormLabel className={classes.label}>Параметры поиска:</FormLabel>
                    <FormControl>
                        <RadioGroup value={this.state.searchParamsType} onChange={this.onChangeParamsTypeSearch}>

                            <FormControlLabel className={classes.formControlLab}
                                              control={<Radio color="primary"/>}
                                              value="login"
                                              label="по логину"
                            />
                            <FormControlLabel className={classes.formControlLab}
                                              control={<Radio color="primary"/>}
                                              value="initials"
                                              label="по фамилии и имени"
                                              labelPlacement='end'
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <RadioGroup value={this.state.searchParamsRole} onChange={this.onChangeParamsRoleSearch}>
                            <FormControlLabel className={classes.formControlLab}
                                              control={<Radio color="primary"/>}
                                              value="Все"
                                              label="по всем"
                            />
                            <FormControlLabel className={classes.formControlLab}
                                              control={<Radio color="primary"/>}
                                              value="Пользователь"
                                              label="по пользователям"
                                              labelPlacement='end'
                            />
                            <FormControlLabel className={classes.formControlLab}
                                              control={<Radio color="primary"/>}
                                              value="Врач"
                                              label="по врачам"
                                              labelPlacement='end'
                            />
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={classes.root}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.header} width={300}>
                                        Фамилия Имя
                                    </TableCell>
                                    <TableCell className={classes.header} width={250} align={"right"}>
                                        Логин
                                    </TableCell>
                                    <TableCell className={classes.header} width={250} align={"right"}>
                                        Роль
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.users &&
                                this.state.users.map((user, index) => (
                                    <StyledTableRow
                                        key={index}
                                    >
                                        <UserCard user={user}/>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(Search)