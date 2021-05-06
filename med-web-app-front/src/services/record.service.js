import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:7999/api/records/';

class RecordService {

    constructor(props) {
        this.createRequestParamsForGet = this.createRequestParamsForGet.bind(this);
        this.createRequestParamsForSave = this.createRequestParamsForSave.bind(this);
    }

    getAll(pageNum, pageSize, titlePart, topic) {
        let parameters = this.createRequestParamsForGet(titlePart, pageNum, pageSize, topic);

        return axios.get(API_URL + 'all',
            {headers: authHeader(), params: parameters});
    }

    getRecord(recordId) {
        return axios.get(API_URL + recordId, { headers: authHeader() });
    }

    getAnswers(recordId) {
        return axios.get(API_URL + 'answers/' + recordId, {headers: authHeader()});
    }

    saveRecord(title, content, topics, files) {
        let parameters = this.createRequestParamsForSave(title,content,topics, files);

        console.log(parameters);
        return axios.post(API_URL + 'create', {title, content, topics, files},{ headers: authHeader() });
    }

    createRequestParamsForGet(searchTitle, page, pageSize, topicId) {
        let params = {};

        if (searchTitle) params["title"] = searchTitle;
        if (page) params["page"] = page - 1;
        if (pageSize) params["size"] = pageSize;
        if (topicId) params["topicId"] = topicId;

        return params;
    }

    createRequestParamsForSave(title, content, topics, attachments) {
        let params = {};

        if (title) params["title"] = title;
        if (content) params["content"] = content;
        if (topics) params["topics"] = topics;
        if (attachments) params["files"] = attachments;

        return params;
    }

}

export default new RecordService();