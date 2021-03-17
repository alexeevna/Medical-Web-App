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
import org.apache.http.entity.BufferedHttpEntity;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.FileEntity;
import org.apache.http.entity.InputStreamEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
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

    /*
{
   "ID" : "9cc915b5-45f10448-362710fd-a5c094d9-629b2643",
   "ParentPatient" : "b6589fc6-ab0dc82c-f12099d1-c2d40ab9-94e8410c",
   "ParentSeries" : "955c729e-c9eb72b5-9f54451d-e21321c2-bd1c5f5e",
   "ParentStudy" : "9fcadbc3-58807fe5-05a2969e-ab4aafaa-af735eaa",
   "Path" : "/instances/9cc915b5-45f10448-362710fd-a5c094d9-629b2643",
   "Status" : "AlreadyStored"
}
     */

    @PostConstruct
    public void init() throws IOException {
        credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(
                AuthScope.ANY,
                new UsernamePasswordCredentials(orthancUsername, orthancPassword)
        );


//        System.out.println("Hi! Started executing \"getAllAvailableInstances\" \n orthancInstancesUrl=" + orthancInstancesUrl);
//        this.getAllAvailableInstances();
//        System.out.println("Ended executing \"getAllAvailableInstances\"");
//
//
//        System.out.println("Hi! Started executing \"uploadInstance\" \n orthancInstancesUrl=" + orthancInstancesUrl);
//        ClassLoader classLoader = getClass().getClassLoader();
//        File dicomForUpload = new File("/home/alexandra/DISK/Medical-Web-App/src/main/resources/image-000002.dcm");
//        this.uploadInstance(FileUtils.openInputStream(dicomForUpload));
//        System.out.println("Ended executing \"uploadInstance\"");
//
//        System.out.println("Hi! Started executing \"getAllAvailableInstances\" \n orthancInstancesUrl=" + orthancInstancesUrl);
//        this.getAllAvailableInstances();
//        System.out.println("Ended executing \"getAllAvailableInstances\"");

        //9cc915b5-45f10448-362710fd-a5c094d9-629b2643
//        System.out.println("Hi! Started executing \"deleteInstance\" \n orthancInstancesUrl=" + orthancInstancesUrl);
//        this.deleteInstance("9cc915b5-45f10448-362710fd-a5c094d9-629b2643");
//        System.out.println("Ended executing \"deleteInstance\"");
    }




    public void getAllAvailableInstanceIds() throws IOException {

        HttpGet request = new HttpGet(orthancInstancesUrl);

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {

            // 401 if wrong user/password
            System.out.println(response.getStatusLine().getStatusCode());

            HttpEntity entity = response.getEntity();
            if (entity != null) {
                // return it as a String
                String jsonResponse = EntityUtils.toString(entity);
                System.out.println(jsonResponse);
            }
        }
    }

    public String uploadInstance(InputStream dicomFile) throws IOException {
        HttpPost request = new HttpPost(orthancInstancesUrl);
        ByteArrayEntity requestEntity = new ByteArrayEntity(IOUtils.toByteArray(dicomFile));

        request.setEntity(requestEntity);
        request.setHeader("Accept", "application/dicom");
        request.setHeader("Content-type", "application/dicom");

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {

            // 401 if wrong user/password
            //TODO handle bad status codes
            //System.out.println(response.getStatusLine().getStatusCode());

            HttpEntity responseEntity = response.getEntity();
            if (responseEntity != null) {
                // return it as a String
                String json = EntityUtils.toString(responseEntity);
                return getIdFromResponse(json);
            } else {
                throw new RuntimeException("Pacs server response is empty");
            }
        }
    }

    public InputStream downloadInstance(String instanceId) throws IOException {
        HttpGet request = new HttpGet(orthancInstancesUrl + "/" + instanceId + "/file");
//        ByteArrayEntity requestEntity = new ByteArrayEntity(IOUtils.toByteArray(dicomFile));

        request.setHeader("Accept", "application/dicom");

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {

            // 401 if wrong user/password
            //TODO handle bad status codes
            //System.out.println(response.getStatusLine().getStatusCode());

            HttpEntity responseEntity = response.getEntity();
            if (responseEntity != null) {
                //String json = EntityUtils.toString(responseEntity);
                return responseEntity.getContent();
            } else {
                throw new RuntimeException("Pacs server response is empty");
            }
        }
    }

    /*
    public void uploadInstanceMultipart(File dicomFile) throws IOException {
        HttpPost request = new HttpPost(orthancInstancesUrl);
        MultipartEntityBuilder builder2 = MultipartEntityBuilder.create();

        builder2.addBinaryBody(
                "addressFile",
                FileUtils.readFileToByteArray(dicomFile),
                ContentType.DEFAULT_BINARY,
                "dicom_file.dcm");
        HttpEntity multipart = builder2.build();
        request.setEntity(multipart);
        request.setHeader("Accept", "application/dicom");
        request.setHeader("Content-type", "application/dicom");
        //CloseableHttpResponse response = httpClient.execute(request);

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {
            System.out.println(response.getStatusLine().getStatusCode());
            System.out.println(response.getEntity());
        }
    }
*/
    public void deleteInstance(String instanceId) throws IOException {
        HttpDelete request = new HttpDelete(orthancInstancesUrl + "/" + instanceId);

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {

            // 401 if wrong user/password
            System.out.println(response.getStatusLine().getStatusCode());

            HttpEntity entity = response.getEntity();
            if (entity != null) {
                // return it as a String
                String result = EntityUtils.toString(entity);
                System.out.println(result);
            }
        }
    }

    private String getIdFromResponse(String json) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> resultMap = objectMapper.readValue(json, new TypeReference<Map<String,Object>>(){});
        //TODO add exception handling
        return resultMap.get("ID").toString();
    }

    /*
    SOP CT Image Storage which is identified by a SOP Class UID of 1.2.840.10008.5.1.4.1.1.2
     */

}
