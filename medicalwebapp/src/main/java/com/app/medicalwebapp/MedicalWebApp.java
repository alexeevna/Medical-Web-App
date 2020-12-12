package com.app.medicalwebapp;

import com.app.medicalwebapp.clients.MirfClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.io.IOException;

@SpringBootApplication
public class MedicalWebApp {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(MedicalWebApp.class, args);
    }
}
