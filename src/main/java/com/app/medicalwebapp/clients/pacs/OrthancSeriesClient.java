package com.app.medicalwebapp.clients.pacs;

import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.springframework.beans.factory.annotation.Value;

import javax.annotation.PostConstruct;
import java.io.IOException;

public class OrthancSeriesClient {


    @Value("${orthanc.url.series}")
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
}
