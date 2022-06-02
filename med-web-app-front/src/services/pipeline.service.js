import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL + '/api/pipelines/';

class PipelineService {

    getAllPipelines() {
        return axios.get(API_URL + 'all', {headers: authHeader()});
    }

    savePipeline(jsonConfiguration, description) {
        return axios.post(API_URL + 'save', {jsonConfiguration, description}, {headers: authHeader()});
    }

    deletePipeline(pipelineId) {
        return axios.delete(API_URL + pipelineId, {headers: authHeader()});
    }
}

export default new PipelineService();