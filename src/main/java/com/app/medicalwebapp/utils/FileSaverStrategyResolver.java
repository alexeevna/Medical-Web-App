package com.app.medicalwebapp.utils;

import com.app.medicalwebapp.model.FileObjectFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Service
public class FileSaverStrategyResolver {

    @Autowired
    List<FileSaverStrategy> strategies;

    public FileSaverStrategy getFileSaver(String fileName, InputStream fileToSave) {
        FileObjectFormat fileFormat = FileFormatResolver.resolveFormat(fileName, fileToSave);
        FileSaverStrategy fileSaver = strategies.stream()
                                            .filter(strategy -> strategy.supportsFormat(fileFormat))
                                            .findFirst()
                                            .orElse(null);
        if (fileSaver != null) {
            return fileSaver;
        } else {
            throw new RuntimeException();
        }
    }
}
