package com.app.medicalwebapp.services;

import com.app.medicalwebapp.clients.mirf.MirfOrchestratorClient;
import com.app.medicalwebapp.clients.mirf.MirfRepositoryClient;
import com.app.medicalwebapp.clients.pacs.OrthancInstancesClient;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.model.Pipeline;
import com.app.medicalwebapp.utils.extracting.FileExtractorStrategy;
import com.app.medicalwebapp.utils.extracting.FileExtractorStrategyResolver;
//import com.mirf.core.data.MirfData;
//import com.mirf.playground.IHD.DicomReadRequest;
//import com.mirf.playground.IHD.DicomReadRequest;
//import com.mirf.core.data.MirfData;
//import com.mirf.playground.IHD.DicomReadRequest;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class PipelineProcessor {

    @Autowired
    FileExtractorStrategyResolver extractorStrategyResolver;

    @Autowired
    MirfOrchestratorClient mirfOrchestrator;

    @Autowired
    MirfRepositoryClient mirfRepository;

    //delete later
    @Autowired
    OrthancInstancesClient orthancInstancesClient;

    @PostConstruct
    public void init() throws Exception {

//        System.out.println("Hi! Started executing \"uploadInstance\"");
//        File dicomForUpload = new File("/home/alexandra/DISK/Medical-Web-App/src/main/resources/image-000002.dcm");
//        String id = orthancInstancesClient.uploadInstance(FileUtils.openInputStream(dicomForUpload));
//
//        System.out.println("Hi! Started executing \"getAllAvailableInstances\"" );
//        orthancInstancesClient.getAllAvailableInstanceIds();
//        System.out.println("Ended executing \"getAllAvailableInstances\"");

        File dicomForUpload = new File("/home/alexandra/DISK/Medical-Web-App/src/main/resources/image-000002.dcm");
        InputStream inputStream = new FileInputStream(dicomForUpload);

        FileObject fileObject = new FileObject();
        fileObject.setPathToFile("kek");
        fileObject.setFormat(FileObjectFormat.DICOM);
        processPipeline(fileObject, null, inputStream);
    }

    public void processPipeline(FileObject fileObject, Pipeline pipeline, InputStream fileAsInputStream) throws Exception {
        String sessionId = mirfOrchestrator.getSessionId();
//        FileExtractorStrategy extractorStrategy = extractorStrategyResolver.getFileExtractor(fileObject.getFormat());
//        InputStream fileAsInputStream = extractorStrategy.getFileInActualFormat(fileObject);
        Object inputInMirfPipeline = resolveMirfInput(fileObject.getFormat(), sessionId);
        byte[] zipArchive = createZipArchive(inputInMirfPipeline, fileAsInputStream, sessionId);
        String zipArchiveName = sessionId + ".zip";
        mirfRepository.sendArchive(sessionId, zipArchiveName, zipArchive);
        mirfOrchestrator.processPipeline(sessionId, MirfOrchestratorClient.DEFAULT_PIPELINE);
    }

    public Object resolveMirfInput(FileObjectFormat fileFormat, String sessionId) {
        if (fileFormat == FileObjectFormat.DICOM) {
            return createMirfDicomReaderRequest(sessionId);
        }
        return null;
    }

    public List<String> createMirfDicomReaderRequest(String sessionId) {
        Path pathForBlock = Paths.get(sessionId, sessionId);
         List<String> requestToReadFiles = Arrays.asList(pathForBlock.toString());
        //Object dicomReadRequest = new Object();
        return requestToReadFiles;
    }

    public byte[] createZipArchive(Object inputObject, InputStream fileToProcess, String fileToProcessName) throws IOException {

        //write object to tmp file
        File tempFile = File.createTempFile("serialized-object-", "");
        FileOutputStream fileOutputStream = new FileOutputStream(tempFile.getName());
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
        objectOutputStream.writeObject(inputObject);
        objectOutputStream.flush();
        objectOutputStream.close();

        //zip input object and med data file
        ByteArrayOutputStream zipArchive = new ByteArrayOutputStream();
        ZipOutputStream zipOut= new ZipOutputStream(zipArchive);
        ZipEntry zipEntry1 = new ZipEntry("input");
        zipOut.putNextEntry(zipEntry1);
        zipOut.write(IOUtils.toByteArray(new FileInputStream(tempFile.getName())));
        zipOut.closeEntry();
        ZipEntry zipEntry2 = new ZipEntry(fileToProcessName);
        zipOut.putNextEntry(zipEntry2);
        zipOut.write(IOUtils.toByteArray(fileToProcess));
        zipOut.closeEntry();
        zipOut.close();

        tempFile.delete();

        return zipArchive.toByteArray();
    }

}
