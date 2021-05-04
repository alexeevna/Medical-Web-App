import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:7999/api/records/';

class RecordService {

    getAll(pageNum, pageSize, titlePart, topic) {
        let parameters = this.createRequestParams(titlePart, pageNum, pageSize, topic);

        return axios.get(API_URL + 'all',
            {headers: authHeader(), params: parameters});
    }

    createRequestParams(searchTitle, page, pageSize, topicId) {
        let params = {};

        if (searchTitle) params["title"] = searchTitle;
        if (page) params["page"] = page - 1;
        if (pageSize) params["size"] = pageSize;
        if (topicId) params["topicId"] = topicId;

        return params;
    }
}

export default new RecordService();