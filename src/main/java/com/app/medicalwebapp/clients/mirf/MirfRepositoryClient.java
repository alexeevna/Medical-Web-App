package com.app.medicalwebapp.clients.mirf;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MirfRepositoryClient {

    @Value("${mirf.repository.url.archive}")
    private String mirfRepositoryArchive;

    private CloseableHttpClient httpclient = HttpClients.createDefault();

    /**
     * @param filename name of archive, it should be in *.zip format
     */
    public Boolean sendArchive(String sessionId, String filename, byte[] zipArchive) throws IOException {

        HttpPost post = new HttpPost(mirfRepositoryArchive);

        MultipartEntityBuilder builder = MultipartEntityBuilder.create();

        builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
        builder.addTextBody("sessionId", sessionId, ContentType.DEFAULT_BINARY);
        builder.addBinaryBody("file", zipArchive, ContentType.DEFAULT_BINARY, filename);

        HttpEntity entity = builder.build();
        post.setEntity(entity);

        HttpResponse response = httpclient.execute(post);

        return response.getStatusLine().getStatusCode() == 200;
    }

}


