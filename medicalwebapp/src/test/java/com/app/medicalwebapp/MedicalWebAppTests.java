package com.app.medicalwebapp;

import com.app.medicalwebapp.clients.MirfClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class MedicalWebAppTests {

    @Autowired
    MirfClient mirfClient;

    @Test
    void contextLoads() throws IOException {
        mirfClient.processPipeline();
    }

}
