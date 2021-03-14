package com.app.medicalwebapp.utils;

import com.app.medicalwebapp.model.FileObjectFormat;
import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component
public class SftpSaverStrategy implements FileSaverStrategy {

    @Override
    public boolean supportsFormat(FileObjectFormat fileFormat) {
        return false;
    }

    @Override
    public void save(Long ownerId, FileObjectFormat format, InputStream fileToSave) {

    }

    @Override
    public void bindToRecord(Long recordId, Long fileId) {

    }
}
