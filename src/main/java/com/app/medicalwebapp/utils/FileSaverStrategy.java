package com.app.medicalwebapp.utils;

import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.model.User;

import java.io.File;

public interface FileSaverStrategy {

    boolean supportsFormat(FileObjectFormat fileFormat);

    void save(Long ownerId, File fileToSave) throws Exception;

    void bindToRecord(Long recordId, Long fileId);
}
