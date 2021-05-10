import axios from "axios";

// const API_URL = "http://localhost:7999/api/auth/";

const API_URL = 'http://mebwebapp.us-east-1.elasticbeanstalk.com/api/auth/'

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, chosenRole) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password,
            chosenRole
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();