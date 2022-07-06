import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + '/api/profile/';

class ProfileService {

    getProfile(username) {
        return axios.get(API_URL + username, {headers: authHeader()});
    }

}

export default new ProfileService()