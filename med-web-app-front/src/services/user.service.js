import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + '/api/search/';


class UserService {

    constructor(props) {
        this.createRequestParamsForGetUsername = this.createRequestParamsForGetUsername.bind(this);
        this.createRequestParamsForGetInitials = this.createRequestParamsForGetInitials.bind(this);
    }

    getAllByUsername(username) {
        let parameters = this.createRequestParamsForGetUsername(username);

        return axios.get(API_URL + 'all/usersByUsername',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGetUsername(username) {
        let params = {};

        if (username) params["username"] = username;
        return params;
    }

    getAllByInitials(initials) {
        let parameters = this.createRequestParamsForGetInitials(initials);

        return axios.get(API_URL + 'all/usersByInitials',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGetInitials(initials) {
        let params = {};

        if (initials) params["initials"] = initials;
        return params;
    }

}

export default new UserService();