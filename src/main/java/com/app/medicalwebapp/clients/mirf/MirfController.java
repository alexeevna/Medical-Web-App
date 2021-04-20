package com.app.medicalwebapp.clients.mirf;

import com.app.medicalwebapp.services.PipelineProcessor;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@RestController
@RequestMapping("api/mirf")
public class MirfController {

    @Autowired
    PipelineProcessor pipelineProcessor;

    @GetMapping("triggerPipeline")
    public void triggerPipeline() throws Exception {
        pipelineProcessor.triggerPipeline();
    }

    @PostMapping("mirfSuccess")
    public void getResultFromPipeline(@RequestParam("sessionId") String sessionId,
                                      @RequestParam("file") MultipartFile resultZipFile) throws IOException, ClassNotFoundException {
        InputStream zipInputStream = resultZipFile.getInputStream();
        byte[] zipInBytes = zipInputStream.readAllBytes();
        System.out.println("Received result from MIRF: " + zipInBytes.length);
        byte[] resultFileInBytes = unzipResultArchive(zipInBytes);
        File pdfFile = new File("pdf-result.pdf");
        Files.copy(new ByteArrayInputStream(resultFileInBytes), pdfFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        System.out.println(resultFileInBytes.length);
    }

    @PostMapping("mirfError")
    public void getErrorFromPipeline(@RequestParam("sessionId") String sessionId,
                                     @RequestParam("failReason") String failReason) {
        System.out.println("Received error from MIRF");
    }


    private byte[] unzipResultArchive(byte[] zipInBytes) throws IOException, ClassNotFoundException {
        ZipInputStream zis = new ZipInputStream(new ByteArrayInputStream(zipInBytes));
        ZipEntry zipEntry = zis.getNextEntry();

        File tempResultFile = File.createTempFile("pipeline-result", ".pdf");
        while (zipEntry != null) {
            System.out.println(zipEntry.getName());
            if (zipEntry.getName().contains("input")) {
                Files.copy(zis, tempResultFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            }
            zipEntry = zis.getNextEntry();
        }
        zis.closeEntry();
        zis.close();

        //byte[] resultFileInBytes = FileUtils.readFileToByteArray(tempResultFile);
        InputStream fileInputStream = new FileInputStream(tempResultFile);
        ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
        List<Byte> resultObject = (List<Byte>)objectInputStream.readObject();
        objectInputStream.close();

        tempResultFile.delete();


        byte[] pdfFileBytes = new byte[resultObject.size()];
        for (int i = 0; i < resultObject.size(); i++) {
            pdfFileBytes[i] = resultObject.get(i);
        }
        return pdfFileBytes;
    }
}
