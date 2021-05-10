import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost:7999/api/files/';

const API_URL = 'http://mebwebapp.us-east-1.elasticbeanstalk.com/api/files/';

class AttachmentService {

    getAttachmentsForUser(username) {
        return axios.get(API_URL + username, { headers: authHeader() });
    }

    getAttachmentsInfoForUser(username) {
        return axios.get(API_URL + 'test/' + username, { headers: authHeader() });
    }

    uploadAttachment(file, fileName, isDicom, onUploadProgress) {
        console.log("Got file to upload");
        let formData = new FormData();

        if (isDicom) {
            formData.append("file", new Blob([file]), fileName);
        } else {
            formData.append("file", file);
        }

        const user = JSON.parse(localStorage.getItem('user'));
        let token = '';
        if (user && user.token) {
            token = user.token;
        }
        return axios.post(API_URL + "upload", formData, {
            headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token},
            onUploadProgress,
        });
    }

    async downloadAttachment(fileId, fileName) {
        axios.get(API_URL + 'download/' + fileId, {responseType: 'blob', headers: authHeader()})
            .then(response => {
                var fileDownload = require('js-file-download');
                fileDownload(response.data, fileName);
                return response;
            });
    }

    async getPreview(fileId) {
        return axios.get(API_URL + 'preview/' + fileId, {headers: authHeader()});
    }
}

export default new AttachmentService();