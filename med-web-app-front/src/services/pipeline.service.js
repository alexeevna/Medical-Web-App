import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:7999/api/pipelines/';

const API_URL = 'http://mebwebapp.us-east-1.elasticbeanstalk.com/api/pipelines/';

class PipelineService {

    getAllPipelines() {
        return axios.get(API_URL + 'all', { headers: authHeader() });
    }

    savePipeline(jsonConfiguration, description) {
        return axios.post(API_URL + 'save', {jsonConfiguration, description},{ headers: authHeader() });
    }
}

export default new PipelineService();