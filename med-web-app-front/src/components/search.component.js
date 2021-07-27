import React, {Component} from "react";
import '../styles/Search.css'
import UserService from "../services/user.service";
import UserCard from "./user-card.component";


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.getUsers = this.getUsers.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeParamsTypeSearch = this.onChangeParamsTypeSearch.bind(this)
        this.onChangeParamsRoleSearch = this.onChangeParamsRoleSearch.bind(this)
        this.state = {
            searchParamsType: "login",
            searchParamsRole: "all",
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
        if (this.state.searchParamsType === "login") {
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
        } else {
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
        console.log(this.state.searchParamsType)
        console.log(this.state.searchParamsRole)
        console.log(this.state.users)
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
                            <i className="fa fa-search" aria-hidden="true"/>
                        </button>
                    </form>
                </div>

                <label>Параметры поиска:</label>
                <div className="div-search-left">
                    <p>
                        <input type="radio"
                               value="login"
                               checked={this.state.searchParamsType === "login"}
                               onChange={this.onChangeParamsTypeSearch}
                               name="paramsType"
                        />
                        по логину
                    </p>
                    <p>
                        <input type="radio"
                               value="initials"
                               checked={this.state.searchParamsType === "initials"}
                               onChange={this.onChangeParamsTypeSearch}
                               name="paramsType"/>
                        по фамилии и имени
                    </p>
                </div>
                <div className="div-search-left">
                    <p>
                        <input type="radio"
                               value="all"
                               checked={this.state.searchParamsRole === "all"}
                               onChange={this.onChangeParamsRoleSearch}
                               name="paramsRole"
                        />
                        по всем
                    </p>
                    <p>
                        <input type="radio"
                               value="users"
                               checked={this.state.searchParamsRole === "users"}
                               onChange={this.onChangeParamsRoleSearch}
                               name="paramsRole"/>
                        по пользователям
                    </p>
                    <p>
                        <input type="radio"
                               value="doctors"
                               checked={this.state.searchParamsRole === "doctors"}
                               onChange={this.onChangeParamsRoleSearch}
                               name="paramsRole"/>
                        по врачам
                    </p>
                </div>

                <div className="div-search div-search-clear">
                    <table className="table-search">
                        <tbody>
                        {this.state.users &&
                        this.state.users.map((user, index) => (
                            <tr
                                className="tr-search"
                                key={index}
                            >
                                <UserCard user={user}/>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}