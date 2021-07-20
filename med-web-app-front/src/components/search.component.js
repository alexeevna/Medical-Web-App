import React, {Component} from "react";
import '../styles/Search.css'
import UserService from "../services/user.service";
import UserCard from "./user-card.component";


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.getUsers = this.getUsers.bind(this)
        this.onChangeLogin = this.onChangeLogin.bind(this)
        this.refreshList = this.refreshList.bind(this);
        this.state = {
            username: "",
            users: [],
        };
        console.log("constructor")
    }

    onChangeLogin(e) {
        const username = e.target.value;
        this.setState({
            username: username,
        });
    }

    getUsers() {
        console.log("getUsers")
        const {username} = this.state
        console.log(username)
        UserService.getAll(username)
            .then((response) => {
                const users = response.data;
                console.log(users)
                console.log(response)
                console.log(response.data)
                // this.refreshList();

                this.setState({
                    users: users,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    // refreshList() {
    //     this.setState({
    //         username: "",
    //         users: [],
    //     });
    // }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const {
            username,
        } = this.state;
        console.log("search.comp")
        console.log(this.state.username)
        console.log(username)
        console.log(this.state.users)
        console.log(this.state.users.length)
        return (
            <div>
                <form className="form-search">
                    <input className="input-search"
                           type="text"
                           placeholder="Искать здесь..."
                           value={username}
                           onChange={this.onChangeLogin}
                    />
                    <button className="button-search"
                            type="button"
                            onClick={this.getUsers}
                    >
                        <i className="fa fa-search" aria-hidden="true"/>
                    </button>
                </form>

                <div>
                    <ul className="list-group">
                        {this.state.users &&
                        this.state.users.map((user) => (
                            <li
                                style={{listStyleType: "none"}}
                            >
                                <UserCard user={user}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}