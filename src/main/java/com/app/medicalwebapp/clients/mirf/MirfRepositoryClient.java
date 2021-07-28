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
import java.net.URI;
import java.net.URISyntaxException;
import java.util.concurrent.TimeUnit;

@Service
public class MirfRepositoryClient {

    @Value("${mirf.repository.url}")
    private String mirfRepositoryUrl;

    @Value("${mirf.repository.port}")
    private String mirfRepositoryPort;

    @Value("${mirf.repository.url.archive}")
    private String mirfRepositoryArchiveEndPoint;

    private CloseableHttpClient httpclient = HttpClients.createDefault();

    /**
     * @param filename name of archive, it should be in *.zip format
     */
    public Boolean sendArchive(String sessionId, String filename, byte[] zipArchive) throws IOException, URISyntaxException, InterruptedException {

        URI repositoryUri = new URI("http", null, mirfRepositoryUrl, Integer.parseInt(mirfRepositoryPort), null, null, null);

        HttpPost post = new HttpPost(repositoryUri.toString() + mirfRepositoryArchiveEndPoint);

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


