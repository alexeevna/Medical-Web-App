package com.app.medicalwebapp.utils;

import com.app.medicalwebapp.model.FileObjectFormat;

import java.io.InputStream;

public interface FileSaverStrategy {

    boolean supportsFormat(FileObjectFormat fileFormat);

    void save(Long ownerId, FileObjectFormat format, InputStream fileToSave) throws Exception;

    void bindToRecord(Long recordId, Long fileId);
}
