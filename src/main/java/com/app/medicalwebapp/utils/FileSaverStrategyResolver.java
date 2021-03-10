package com.app.medicalwebapp.utils;

import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class FileSaverStrategyResolver {

    @Autowired
    List<FileSaverStrategy> strategies;

    public FileSaverStrategy getFileSaver(File fileToSave) {
        FileObjectFormat fileFormat = FileFormatResolver.resolveFormat(fileToSave);
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
