package com.app.medicalwebapp.clients;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MirfClient {

    private final static String DEFAULT_PIPELINE = "[\n" +
            "  { \"id\": 0, \"blockType\" : \"ReadDicomImageSeriesAlg\", \"children\": [1, 2] },\n" +
            "  { \"id\": 1, \"blockType\" : \"AddMaskAlg\", \"children\": [3] },\n" +
            "  { \"id\": 2, \"blockType\" : \"ConvertImagesToPdfAlg\", \"children\": [4] },\n" +
            "  { \"id\": 3, \"blockType\" : \"ConvertImagesToPdfAlg\", \"children\": [4] },\n" +
            "  { \"id\": 4, \"blockType\" : \"PrepareReportAlg\", \"children\": [5] },\n" +
            "  { \"id\": 5, \"blockType\" : \"SaveReportAlg\", \"children\": [] }\n" +
            "]\n";

    private static CloseableHttpClient httpclient = HttpClients.createDefault();

    public static Boolean processPipeline() throws IOException {

        HttpPost post = new HttpPost("http://localhost:5010/process");

        MultipartEntityBuilder builder = MultipartEntityBuilder.create();

        builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
        builder.addTextBody("sessionId", "id1", ContentType.DEFAULT_BINARY);
        builder.addTextBody("pipeline", DEFAULT_PIPELINE, ContentType.DEFAULT_BINARY);

        HttpEntity entity = builder.build();
        post.setEntity(entity);

        HttpResponse response = httpclient.execute(post);

        return response.getStatusLine().getStatusCode() == 200;
    }
}
