package com.app.medicalwebapp.clients.mirf;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@Service
public class MirfOrchestratorClient {


    @Value("${mirf.orchestrator.url}")
    private String mirfOrchestratorUrl;

    @Value("${mirf.orchestrator.port}")
    private String mirfOrchestratorPort;

    @Value("${mirf.orchestrator.url.pipeline.start}")
    private String mirfPipelineEndPoint;

    @Value("${mirf.orchestrator.url.sessionId}")
    private String mirfSessionIdEndpoint;

    @Value("${mirf.orchestrator.url.registerClient}")
    private String mirfRegisterClientEndpoint;


    public final static String DEFAULT_PIPELINE = "[\n" +
            "  { \"id\": 0, \"blockType\" : \"DicomImageSeriesReaderAlg\", \"children\": [1, 3] },\n" +
            "  { \"id\": 1, \"blockType\" : \"DicomAddCircleMaskAlg\", \"children\": [2] },\n" +
            "  { \"id\": 2, \"blockType\" : \"ConvertHighlightedDicomImagesToPdfAlg\", \"children\": [4] },\n" +
            "  { \"id\": 3, \"blockType\" : \"ConvertDicomImagesToPdfAlg\", \"children\": [4] },\n" +
            "  { \"id\": 4, \"blockType\" : \"PdfFileCreatorAlg\", \"children\": [] }\n" +
            "]\n";

    public final static String DEFAULT_PIPELINE2 = "[\n" +
            "  { \"id\": 0, \"blockType\" : \"PipelineForDeveloping\", \"children\": [] }\n" +
            "]\n";

    public final static String IHD_PIPELINE = "[\n" +
            "  { \"id\": 0, \"blockType\" : \"IhdDataReaderAlg\", \"children\": [] }\n" +
            "]\n";

    private CloseableHttpClient httpclient = HttpClients.createDefault();

    public Boolean processPipeline(String sessionId, String pipelineConfiguration) throws IOException, URISyntaxException {

        URI repositoryUri = new URI("http", null, mirfOrchestratorUrl, Integer.parseInt(mirfOrchestratorPort), null, null, null);

        HttpPost post = new HttpPost(repositoryUri.toString() + mirfPipelineEndPoint);

        MultipartEntityBuilder builder = MultipartEntityBuilder.create();

        builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
        builder.addTextBody("sessionId", sessionId, ContentType.DEFAULT_BINARY);
        builder.addTextBody("pipeline", pipelineConfiguration, ContentType.DEFAULT_BINARY);

        HttpEntity entity = builder.build();
        post.setEntity(entity);

        HttpResponse response = httpclient.execute(post);

        return response.getStatusLine().getStatusCode() == 200;
    }

    public String getSessionId() throws Exception {

        URI repositoryUri = new URI("http", null, mirfOrchestratorUrl, Integer.parseInt(mirfOrchestratorPort), null, null, null);

        HttpGet request = new HttpGet(repositoryUri + mirfSessionIdEndpoint);

        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(request)) {

            HttpEntity entity = response.getEntity();
            if (response.getStatusLine().getStatusCode() == 200 && entity != null) {
                String sessionId = EntityUtils.toString(entity);
                System.out.println(sessionId);
                return sessionId;
            } else {
                throw new Exception("Mirf service unavailable");
            }
        }
    }
}
