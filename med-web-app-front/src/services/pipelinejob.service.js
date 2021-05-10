import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:7999/api/pipelinejobs/';
const API_URL = 'http://mebwebapp.us-east-1.elasticbeanstalk.com/api/pipelinejobs/';

class PipelineJobService {

    getPipelineJobsForUser(username) {
        return axios.get(API_URL + username, { headers: authHeader() });
    }

    sendRequestForPipelineJob(username, pipelineId, fileId) {
        return axios.post(API_URL + username, {pipelineId, fileId},{ headers: authHeader() });
    }
}

export default new PipelineJobService();