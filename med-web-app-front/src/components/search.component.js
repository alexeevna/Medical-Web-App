import React, {Component} from "react";
import '../styles/Search.css'
import UserService from "../services/user.service";
import UserCard from "./user-card.component";


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.getUsers = this.getUsers.bind(this)
        this.onChangeLogin = this.onChangeLogin.bind(this)
        this.state = {
            username: "",
            users: [],
        };
    }

    onChangeLogin(e) {
        const username = e.target.value;
        this.setState({
            username: username,
        });
    }

    getUsers() {
        const {username} = this.state
        UserService.getAll(username)
            .then((response) => {
                const users = response.data;

                this.setState({
                    users: users,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const {
            username,
        } = this.state;
        return (
            <div>
                <div className="div-search">
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