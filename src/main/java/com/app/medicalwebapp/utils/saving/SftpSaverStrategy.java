package com.app.medicalwebapp.utils.saving;

import com.app.medicalwebapp.clients.sftp.SftpClient;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.services.FileObjectService;
import com.app.medicalwebapp.utils.saving.FileSaverStrategy;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Component
public class SftpSaverStrategy implements FileSaverStrategy {

    @Autowired
    SftpClient sftpClient;

    @Autowired
    FileObjectService fileObjectService;

    private Set<FileObjectFormat> SUPPORTED_FORMATS = Set.of(FileObjectFormat.PDF, FileObjectFormat.JPEG);

    @Override
    public boolean supportsFormat(FileObjectFormat fileFormat) {
        return SUPPORTED_FORMATS.contains(fileFormat);
    }

    @Override
    public void save(Long ownerId, FileObjectFormat format, InputStream fileToSave) throws SftpException, JSchException {
        String uniqueID = UUID.randomUUID().toString();
        sftpClient.saveFile(fileToSave, uniqueID);
        FileObject fileObject = new FileObject();
        fileObject.setOwner(ownerId);
        fileObject.setPathToFile(uniqueID);
        fileObject.setFormat(format);
        fileObject.setCreationTime(LocalDateTime.now());
        fileObjectService.saveFileObject(fileObject);
    }
}
