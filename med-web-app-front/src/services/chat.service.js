import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + '/api/msg/';


class ChatService {
    getMessages(senderUsername, recipientUsername) {
        let parameters = this.createRequestParamsForGetMsg(senderUsername, recipientUsername);

        return axios.get(API_URL + 'allMessages',
            {headers: authHeader(), params: parameters});
    }

    createRequestParamsForGetMsg(senderUsername, recipientUsername) {
        let params = {};

        params["senderUsername"] = senderUsername;
        params["recipientUsername"] = recipientUsername;
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
        return axios.post(API_URL + 'updateMessages', {messages},
            {headers: authHeader()});
    }

    createRequestParamsForUpdateUnreadMsg(messages) {
        let params = {};

        params["messages"] = messages;
        return params;
    }

    deleteMsg(message) {
        return axios.post(API_URL + 'deleteMsg', {message}, {headers: authHeader()})
    }

    deleteMsgByTimeAndChatId(time, senderName, recipientName) {
        return axios.post(API_URL + 'deleteMsgByTimeAndChatId', {
            time,
            senderName,
            recipientName
        }, {headers: authHeader()})
    }


}

export default new ChatService();