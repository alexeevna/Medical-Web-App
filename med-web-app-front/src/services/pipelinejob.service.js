import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL + '/api/pipelinejobs/';

class PipelineJobService {

    getPipelineJobsForUser(username) {
        return axios.get(API_URL + username, { headers: authHeader() });
    }

    sendRequestForPipelineJob(username, pipelineId, fileId) {
        return axios.post(API_URL + username, {pipelineId, fileId},{ headers: authHeader() });
    }
}

export default new PipelineJobService();