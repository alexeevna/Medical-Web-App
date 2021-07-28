package com.app.medicalwebapp.clients.pacs;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

@Service
@Lazy
public class OrthancInstancesClient {

    @Value("${orthanc.url.instances}")
    private String orthancInstancesUrl;

    @Value("${orthanc.credentials.username}")
    private String orthancUsername;

    @Value("${orthanc.credentials.password}")
    private String orthancPassword;

    private CredentialsProvider credentialsProvider;

    @PostConstruct
    public void init() throws IOException {
        credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(
                AuthScope.ANY,
                new UsernamePasswordCredentials(orthancUsername, orthancPassword)
        );
    }

    public void getAllAvailableInstanceIds() throws IOException {

        HttpGet request = new HttpGet(orthancInstancesUrl);

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {

            HttpEntity entity = response.getEntity();
            if (entity != null) {
                String jsonResponse = EntityUtils.toString(entity);
            }
        }
    }

    public String uploadInstance(byte[] dicomFile) throws IOException {
        HttpPost request = new HttpPost(orthancInstancesUrl);
        ByteArrayEntity requestEntity = new ByteArrayEntity(dicomFile);

        request.setEntity(requestEntity);
        request.setHeader("Accept", "application/dicom");
        request.setHeader("Content-type", "application/dicom");

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {

            HttpEntity responseEntity = response.getEntity();
            if (responseEntity != null) {
                String json = EntityUtils.toString(responseEntity);
                return getIdFromResponse(json);
            } else {
                throw new RuntimeException("Pacs server response is empty");
            }
        }
    }

    public byte[] downloadInstance(String instanceId) throws IOException {
        HttpGet request = new HttpGet(orthancInstancesUrl + "/" + instanceId + "/file");

        request.setHeader("Accept", "application/dicom");

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {

            HttpEntity responseEntity = response.getEntity();
            if (responseEntity != null) {
                InputStream is = responseEntity.getContent();
                return IOUtils.toByteArray(is);
            } else {
                throw new RuntimeException("Pacs server response is empty");
            }
        }
    }

    public ByteArrayInputStream previewInstance(String instanceId) throws IOException {
        HttpGet request = new HttpGet(orthancInstancesUrl + "/" + instanceId + "/rendered");

        request.setHeader("Accept", "image/jpeg");

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {

            HttpEntity entity = response.getEntity();
            if (entity != null) {
                InputStream is = entity.getContent();
                byte[] bytes = IOUtils.toByteArray(is);
                return new ByteArrayInputStream(bytes);
            }
        }
        return null;
    }

    public void deleteInstance(String instanceId) throws IOException {
        HttpDelete request = new HttpDelete(orthancInstancesUrl + "/" + instanceId);

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {

            HttpEntity entity = response.getEntity();
            if (entity != null) {
                String result = EntityUtils.toString(entity);
            }
        }
    }

    private String getIdFromResponse(String json) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> resultMap = objectMapper.readValue(json, new TypeReference<Map<String,Object>>(){});
        return resultMap.get("ID").toString();
    }

}
