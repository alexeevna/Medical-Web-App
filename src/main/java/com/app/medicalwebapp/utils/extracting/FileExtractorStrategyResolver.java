package com.app.medicalwebapp.utils.extracting;

import com.app.medicalwebapp.model.FileObjectFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FileExtractorStrategyResolver {

    @Autowired
    List<FileExtractorStrategy> strategies;

    @Autowired
    SftpExtractorStrategy sftpExtractorStrategy;

    public FileExtractorStrategy getFileExtractor(FileObjectFormat fileFormat) {
        FileExtractorStrategy fileExtractor = strategies.stream()
                .filter(strategy -> strategy.supportsFormat(fileFormat))
                .findFirst()
                .orElse(sftpExtractorStrategy);
        return fileExtractor;
    }

}
