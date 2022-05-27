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
    public FileObject save(Long ownerId, String initialName, FileObjectFormat format, byte[] fileToSave, String UID) throws SftpException, JSchException {
        System.out.println("Saving file from user " + ownerId);
        String uniqueID = UUID.randomUUID().toString();
        String pathToFile = "/upload/" + uniqueID;
        sftpClient.saveFile(fileToSave, pathToFile);
        FileObject fileObject = new FileObject();
        fileObject.setOwner(ownerId);
        fileObject.setPathToFile(pathToFile);
        fileObject.setFormat(format);
        fileObject.setInitialName(initialName);
        fileObject.setCreationTime(LocalDateTime.now());
        fileObjectService.saveFileObject(fileObject);
        return fileObject;
    }
}
