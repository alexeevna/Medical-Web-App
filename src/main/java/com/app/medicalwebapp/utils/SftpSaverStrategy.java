package com.app.medicalwebapp.utils;

import com.app.medicalwebapp.model.FileObjectFormat;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class SftpSaverStrategy implements FileSaverStrategy {

    @Override
    public boolean supportsFormat(FileObjectFormat fileFormat) {
        return false;
    }

    @Override
    public void save(Long ownerId, File fileToSave) {

    }

    @Override
    public void bindToRecord(Long recordId, Long fileId) {

    }
}
