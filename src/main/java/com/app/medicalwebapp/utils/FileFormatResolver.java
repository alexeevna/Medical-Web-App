package com.app.medicalwebapp.utils;

import com.app.medicalwebapp.model.FileObjectFormat;

import java.io.File;

public class FileFormatResolver {

    public static FileObjectFormat resolveFormat(File file) {
        String name = file.getName();
        if (name.contains(".") && name.length() >= 4) {
            String fileExtension = name.split(".")[1].toLowerCase();
            switch (fileExtension) {
                case "dcm":
                    return FileObjectFormat.DICOM;
                case "jpg":
                    return FileObjectFormat.JPEG;
                case "pdf":
                    return FileObjectFormat.PDF;
            }
        } else {
            throw new RuntimeException();
        }
        return FileObjectFormat.UNKNOWN;
    }
}
