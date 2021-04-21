import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:7999/api/files/';

class AttachmentService {

    getAttachmentsForUser(username) {
        return axios.get(API_URL + username, { headers: authHeader() });
        //     .then(response => {
        //         //console.log(response);
        //         console.log(response.data);
        //         //console.log(JSON.stringify(response.data));
        //         return response.data;
        //     });
        // return data;
    }

    uploadAttachment(file, onUploadProgress) {
        console.log("Got file to send");
        console.log(authHeader());
        let formData = new FormData();

        formData.append("file", file);

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
}

export default new AttachmentService();