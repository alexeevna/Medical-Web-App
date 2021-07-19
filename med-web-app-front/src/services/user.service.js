import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + '/api/search/';


class UserService {

    constructor(props) {
        this.createRequestParamsForGet = this.createRequestParamsForGet.bind(this);
    }

    getAll(login) {
        let parameters = this.createRequestParamsForGet(login);

        return axios.get(API_URL + 'all/users',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGet(login) {
        let params = {};

        if (login) params["login"] = login;
        console.log(login)
        console.log("user.service")
        return params;
    }

}

export default new UserService();