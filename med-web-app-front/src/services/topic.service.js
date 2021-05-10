import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:7999/api/topics/';

const API_URL = 'http://mebwebapp.us-east-1.elasticbeanstalk.com/api/topics/';

class TopicService {

    getAllTopics() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    saveTopic(topicName) {
        return axios.post(API_URL + 'save', {topicName: topicName},{ headers: authHeader() });
    }
}

export default new TopicService();