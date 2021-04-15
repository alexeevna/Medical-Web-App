package com.app.medicalwebapp.clients.mirf;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@RestController
public class MirfController {

    @PostMapping("mirfSuccess")
    public void getResultFromPipeline(@RequestParam("sessionId") String sessionId,
                                      @RequestParam("file") MultipartFile resultZipFile) throws IOException {
        System.out.println("Received result from MIRF");
        InputStream zipInputStream = resultZipFile.getInputStream();
    }

    @PostMapping("mirfError")
    public void getErrorFromPipeline(@RequestParam("sessionId") String sessionId,
                                     @RequestParam("failReason") String failReason) {
        System.out.println("Received error from MIRF");
    }
}
