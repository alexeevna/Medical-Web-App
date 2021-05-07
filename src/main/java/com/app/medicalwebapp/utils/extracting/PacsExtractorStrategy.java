package com.app.medicalwebapp.utils.extracting;

import com.app.medicalwebapp.clients.pacs.OrthancInstancesClient;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
public class PacsExtractorStrategy implements FileExtractorStrategy {

    @Autowired
    OrthancInstancesClient orthancClient;

    @Override
    public boolean supportsFormat(FileObjectFormat fileFormat) {
        return fileFormat == FileObjectFormat.DICOM;
    }

    @Override
    public InputStream getFileInActualFormat(FileObject fileObject) throws Exception {
        return orthancClient.downloadInstance(fileObject.getPathToFile());
    }

    @Override
    public byte[] getHumanReadablePresentation(FileObject fileObject) throws IOException {
        return orthancClient.previewInstance(fileObject.getPathToFile()).readAllBytes();
    }
}
