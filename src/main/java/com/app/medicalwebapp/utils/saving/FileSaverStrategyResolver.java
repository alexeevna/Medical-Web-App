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

    @Autowired
    FileSaverStrategy sftpSaverStrategy;

    public FileSaverStrategy getFileSaver(String fileName, byte[] content) {
        FileObjectFormat fileFormat = FileFormatResolver.resolveFormat(fileName);
        FileSaverStrategy fileSaver = strategies.stream()
                                            .filter(strategy -> strategy.supportsFormat(fileFormat))
                                            .findFirst()
                                            .orElseGet(() -> sftpSaverStrategy);
        return fileSaver;
    }
}
