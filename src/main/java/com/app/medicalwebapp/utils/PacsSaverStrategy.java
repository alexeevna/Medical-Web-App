package com.app.medicalwebapp.utils;

import com.app.medicalwebapp.clients.pacs.OrthancInstancesClient;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.services.FileObjectService;
import com.app.medicalwebapp.services.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.time.LocalDateTime;

@Component
public class PacsSaverStrategy implements FileSaverStrategy {

    @Autowired
    OrthancInstancesClient orthancClient;

    @Autowired
    RecordService recordService;

    @Autowired
    FileObjectService fileObjectService;

    @Override
    public boolean supportsFormat(FileObjectFormat fileFormat) {
        return fileFormat == FileObjectFormat.DICOM;
    }

    @Override
    public void save(Long ownerId, FileObjectFormat format, InputStream fileToSave) throws Exception {
        FileObject fileObject = new FileObject();
        fileObject.setOwner(ownerId);
        String idPathInPacs = orthancClient.uploadInstance(fileToSave);
        fileObject.setPathToFile(idPathInPacs);
        fileObject.setFormat(format);
        fileObject.setCreationTime(LocalDateTime.now());
        fileObject.setSize(0);
        fileObjectService.saveRecord(fileObject);
    }

    @Override
    public void bindToRecord(Long recordId, Long fileId) {

    }
}
