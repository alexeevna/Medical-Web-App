package com.app.medicalwebapp.utils;

import com.app.medicalwebapp.model.FileObjectFormat;

import java.io.InputStream;

public class FileFormatResolver {

    public static FileObjectFormat resolveFormat(String name, byte[] content) {
        System.out.println("Stepped in format resolver");
        if (name.contains(".") && name.length() >= 4) {
            String fileExtension = name.split("\\.")[1].toLowerCase();
            System.out.println("FileExtension " + fileExtension);
            switch (fileExtension) {
                case "dcm":
                    return FileObjectFormat.DICOM;
                case "jpg":
                    return FileObjectFormat.JPEG;
                case "pdf":
                    return FileObjectFormat.PDF;
                default:
                    return FileObjectFormat.UNKNOWN;
            }
        }
        System.out.println("Format is unknown");
        return FileObjectFormat.UNKNOWN;
    }
}
