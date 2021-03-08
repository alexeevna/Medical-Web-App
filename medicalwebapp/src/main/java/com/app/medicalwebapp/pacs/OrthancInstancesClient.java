package com.app.medicalwebapp.pacs;

import org.apache.http.HttpEntity;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.AbstractHttpEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.FileEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

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


        System.out.println("Hi! Started executing \"getAllAvailableInstances\" \n orthancInstancesUrl=" + orthancInstancesUrl);
        this.getAllAvailableInstances();
        System.out.println("Ended executing \"getAllAvailableInstances\"");


//        System.out.println("Hi! Started executing \"uploadInstance\" \n orthancInstancesUrl=" + orthancInstancesUrl);
//        ClassLoader classLoader = getClass().getClassLoader();
//        File dicomForUpload = new File("/home/alexandra/DISK/Medical-Web-App/medicalwebapp/src/main/resources/image-000002.dcm");
//        this.uploadInstance(dicomForUpload);
//        System.out.println("Ended executing \"uploadInstance\"");

        //9cc915b5-45f10448-362710fd-a5c094d9-629b2643
//        System.out.println("Hi! Started executing \"deleteInstance\" \n orthancInstancesUrl=" + orthancInstancesUrl);
//        this.deleteInstance("9cc915b5-45f10448-362710fd-a5c094d9-629b2643");
//        System.out.println("Ended executing \"deleteInstance\"");
    }




    public void getAllAvailableInstances() throws IOException {

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
                String result = EntityUtils.toString(entity);
                System.out.println(result);
            }
        }
    }

    public void uploadInstance(File dicomFile) throws IOException {
        HttpPost request = new HttpPost(orthancInstancesUrl);
        FileEntity requestEntity = new FileEntity(dicomFile);

        request.setEntity(requestEntity);
        request.setHeader("Accept", "application/dicom");
        request.setHeader("Content-type", "application/dicom");

        try (CloseableHttpClient httpClient = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();
             CloseableHttpResponse response = httpClient.execute(request)) {

            // 401 if wrong user/password
            System.out.println(response.getStatusLine().getStatusCode());

            HttpEntity responseEntity = response.getEntity();
            if (responseEntity != null) {
                // return it as a String
                String result = EntityUtils.toString(responseEntity);
                System.out.println(result);
            }
        }
    }

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

    /*
    SOP CT Image Storage which is identified by a SOP Class UID of 1.2.840.10008.5.1.4.1.1.2
     */

}
