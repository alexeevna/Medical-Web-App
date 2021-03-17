package com.app.medicalwebapp.utils.saving;

import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.utils.FileFormatResolver;
import com.app.medicalwebapp.utils.saving.FileSaverStrategy;
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
                                            .orElseThrow(RuntimeException::new);
        return fileSaver;
    }
}
