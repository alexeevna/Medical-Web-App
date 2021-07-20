import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + '/api/search/';


class UserService {

    constructor(props) {
        this.createRequestParamsForGet = this.createRequestParamsForGet.bind(this);
    }

    getAll(username) {
        let parameters = this.createRequestParamsForGet(username);

        return axios.get(API_URL + 'all/users',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGet(username) {
        let params = {};

        if (username) params["username"] = username;
        console.log(username)
        console.log("user.service")
        return params;
    }

}

export default new UserService();