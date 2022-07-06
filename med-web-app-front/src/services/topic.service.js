import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL + '/api/topics/';

class TopicService {

    getAllTopics() {
        return axios.get(API_URL + 'all', {headers: authHeader()});
    }

    saveTopic(topicName) {
        return axios.post(API_URL + 'create', {topicName}, {headers: authHeader()});
    }
}

export default new TopicService();