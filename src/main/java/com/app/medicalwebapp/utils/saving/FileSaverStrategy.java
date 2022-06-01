package com.app.medicalwebapp.utils.saving;

import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;

import java.io.InputStream;

public interface FileSaverStrategy {

    boolean supportsFormat(FileObjectFormat fileFormat);

    FileObject save(Long ownerId, String initialName, FileObjectFormat format, byte[] fileToSave, String UID) throws Exception;
}
