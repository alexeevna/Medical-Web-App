package com.app.medicalwebapp.utils.extracting;

import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;

import java.io.InputStream;

public interface FileExtractorStrategy {

    boolean supportsFormat(FileObjectFormat fileFormat);

    InputStream getFileInActualFormat(FileObject fileObject) throws Exception;

    void getHumanReadablePresentation();
}
