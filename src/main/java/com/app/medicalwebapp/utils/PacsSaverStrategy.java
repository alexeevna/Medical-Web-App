package com.app.medicalwebapp.utils;

import com.app.medicalwebapp.clients.pacs.OrthancInstancesClient;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class PacsSaverStrategy implements FileSaverStrategy {

    @Autowired
    OrthancInstancesClient orthancClient;

    @Override
    public boolean supportsFormat(FileObjectFormat fileFormat) {
        return fileFormat == FileObjectFormat.DICOM;
    }

    @Override
    public void save(Long ownerId, File fileToSave) throws Exception {
        FileObject fileObject = new FileObject();
        fileObject.setOwner(ownerId);
        String idPath = orthancClient.uploadInstance(fileToSave);
        fileObject.setPathToFile(idPath);
        fileObject.setFormat(FileFormatResolver.resolveFormat(fileToSave));
        fileObject.setCreationTime(LocalDateTime.now());
        fileObject.setSize(0);
    }

    @Override
    public void bindToRecord(Long recordId, Long fileId) {

    }
}
