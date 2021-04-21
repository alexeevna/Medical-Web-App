package com.app.medicalwebapp.services;

import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.utils.FileFormatResolver;
import com.app.medicalwebapp.utils.saving.FileSaverStrategy;
import com.app.medicalwebapp.utils.saving.FileSaverStrategyResolver;
import com.app.medicalwebapp.utils.saving.SftpSaverStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Service
public class FileService {

    @Autowired
    FileSaverStrategyResolver saverStrategyResolver;

    public void saveFile(String originalName, byte[] fileContent, Long ownerId) throws Exception {
        System.out.println("Stepped into fileService");
        FileSaverStrategy fileSaver = saverStrategyResolver.getFileSaver(originalName, fileContent);
        FileObjectFormat format = FileFormatResolver.resolveFormat(originalName, fileContent);
        System.out.println(format);
        System.out.println("IsSftpStrategy: " + (fileSaver instanceof SftpSaverStrategy));
        fileSaver.save(ownerId, originalName, format, new ByteArrayInputStream(fileContent));
    }
}
