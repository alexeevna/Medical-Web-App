package com.app.medicalwebapp.utils.extracting;

import com.app.medicalwebapp.model.FileObjectFormat;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class FileExtractorStrategyResolver {

    @Autowired
    List<FileExtractorStrategy> strategies;

    public FileExtractorStrategy getFileExtractor(FileObjectFormat fileFormat) {
        FileExtractorStrategy fileExtractor = strategies.stream()
                .filter(strategy -> strategy.supportsFormat(fileFormat))
                .findFirst()
                .orElseThrow(RuntimeException::new);
        return fileExtractor;
    }

}
