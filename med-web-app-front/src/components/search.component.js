import React, {Component} from "react";
import '../styles/Search.css'
import UserService from "../services/user.service";
import UserCard from "./user-card.component";


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.getUsers = this.getUsers.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeParamsSearch = this.onChangeParamsSearch.bind(this)
        this.state = {
            searchParams: "login",
            searchString: "",
            users: [],
        };
    }

    // setLastnameFirstname(arrayFirstLastName) {
    //     this.setState({
    //         lastname: arrayFirstLastName[0],
    //         firstname: arrayFirstLastName[1],
    //     });
    // }

    onChangeUsername(e) {
        const searchString = e.target.value;
        this.setState({
            searchString: searchString,
        });
    }

    onChangeParamsSearch(e) {
        this.setState({
            searchParams: e.target.value
        });
    }

    getUsers() {
        const {searchString} = this.state
        if (this.state.searchParams === "login") {
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

                <div className="div-search">
                    <label>Параметр поиска:</label>
                    <p>
                        <input type="radio"
                               value="login"
                               checked={this.state.searchParams === "login"}
                               onChange={this.onChangeParamsSearch}
                               name="params"
                        />
                        по логину
                    </p>
                    <p>
                        <input type="radio"
                               value="initials"
                               checked={this.state.searchParams === "initials"}
                               onChange={this.onChangeParamsSearch}
                               name="params"/>
                        по фамилии и имени
                    </p>
                </div>

                <div>
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