package com.app.medicalwebapp.utils.extracting;

import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;

public interface FileExtractorStrategy {

    boolean supportsFormat(FileObjectFormat fileFormat);

    byte[] getFileInActualFormat(FileObject fileObject) throws Exception;

    byte[] getHumanReadablePresentation(FileObject fileObject) throws Exception;
}
