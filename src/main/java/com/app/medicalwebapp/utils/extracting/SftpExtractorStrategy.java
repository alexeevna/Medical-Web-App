package com.app.medicalwebapp.utils.extracting;

import com.app.medicalwebapp.clients.sftp.SftpClient;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.Set;

@Component
public class SftpExtractorStrategy implements FileExtractorStrategy {

    @Autowired
    SftpClient sftpClient;

    private Set<FileObjectFormat> SUPPORTED_FORMATS = Set.of(FileObjectFormat.PDF, FileObjectFormat.JPEG);

    @Override
    public boolean supportsFormat(FileObjectFormat fileFormat) {
        return SUPPORTED_FORMATS.contains(fileFormat);
    }

    @Override
    public InputStream getFileInActualFormat(FileObject fileObject) throws Exception {
        return sftpClient.getFile(fileObject.getPathToFile());
    }

    @Override
    public void getHumanReadablePresentation() {
        throw new UnsupportedOperationException();
    }
}
