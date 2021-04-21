package com.app.medicalwebapp.utils.saving;

import com.app.medicalwebapp.model.FileObjectFormat;

import java.io.InputStream;

public interface FileSaverStrategy {

    boolean supportsFormat(FileObjectFormat fileFormat);

    void save(Long ownerId, String initialName, FileObjectFormat format, InputStream fileToSave) throws Exception;
}
