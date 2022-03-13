import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + '/api/msg/';


class ChatService {
    getMessages(senderId, recipientId) {
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

    getUnreadMessages(recipientId) {
        let parameters = this.createRequestParamsForGetUnreadMsg(recipientId);

        return axios.get(API_URL + 'unreadMessages',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGetUnreadMsg(recipientId) {
        let params = {};

        params["recipientId"] = recipientId;
        return params;
    }

    updateStatusUnreadMessages(messages) {
        console.log(messages)
        let parameters = this.createRequestParamsForUpdateUnreadMsg(messages);

        return axios.post(API_URL + 'updateMessages', {messages},
            {headers: authHeader()});
    }

    createRequestParamsForUpdateUnreadMsg(messages) {
        let params = {};

        params["messages"] = messages;
        return params;
    }

}

export default new ChatService();