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
                const {username} = response.data;
                console.log(username)
                console.log(response)
                console.log(response.data)
                this.refreshList();

                this.setState({
                    username: username,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        this.setState({
            username: "",
        });
    }

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
                        <li
                            style={{listStyleType: "none"}}
                        >
                            <UserCard username={username} isPreview={true} isReply={false}/>
                        </li>
                    </ul>
                </div>
            </div>
            // <div className="list row">
            //     <div className="col-sm-9">
            //         <div className="input-group mb-3">
            //             <input
            //                 type="text"
            //                 className="form-control"
            //                 placeholder="Введите часть заголовка"
            //                 value={username}
            //                 onChange={this.onChangeLogin}
            //             />
            //             <div className="input-group-append">
            //                 <button
            //                     className="btn btn-outline-secondary"
            //                     type="button"
            //                     onClick={this.getUsers}
            //                 >
            //                     Найти
            //                 </button>
            //             </div>
            //         </div>
            //
            //         <ul className="list-group">
            //             {this.state.users &&
            //             this.state.users.map((user, index) => (
            //                 <li
            //                     style={{listStyleType: "none"}}
            //                     key={index}
            //                 >
            //                     <UserCard user={user} isPreview={true} isReply={false}/>
            //                 </li>
            //
            //             ))}
            //         </ul>
            //     </div>
            // </div>
        );
    }
}