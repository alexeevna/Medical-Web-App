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

        return axios.get(API_URL + 'allByUsername',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGetUsername(username) {
        let params = {};

        if (username) params["username"] = username;
        return params;
    }

    getByUsername(username, role) {
        let parameters = this.createRequestParamsForGetUsernameAndRole(username, role);

        return axios.get(API_URL + 'byUsername',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGetUsernameAndRole(username, role) {
        let params = {};

        if (username) params["username"] = username;
        if (role) params["role"] = role;
        return params;
    }

    getAllByInitials(initials) {
        let parameters = this.createRequestParamsForGetInitials(initials);

        return axios.get(API_URL + 'allByInitials',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGetInitials(initials) {
        let params = {};

        if (initials) params["initials"] = initials;
        return params;
    }

    getByInitials(initials, role) {
        let parameters = this.createRequestParamsForGetInitialsAndRole(initials, role);

        return axios.get(API_URL + 'byInitials',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGetInitialsAndRole(initials, role) {
        let params = {};

        if (initials) params["initials"] = initials;
        if (role) params["role"] = role;
        return params;
    }

}

export default new UserService();