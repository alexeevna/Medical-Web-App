import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + '/api/msg/';


class ChatService {
    getMessages(senderId, recipientId) {
        console.log(senderId)
        console.log(recipientId)
        let parameters = this.createRequestParamsForGetMsg(senderId, recipientId);

        return axios.get(API_URL + 'allMessages',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGetMsg(senderId, recipientId) {
        let params = {};

        params["senderId"] = senderId;
        params["recipientId"] = recipientId;
        return params;
    }

}

export default new ChatService();