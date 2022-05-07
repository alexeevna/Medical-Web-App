package com.app.medicalwebapp.controllers.requestbody;

import com.app.medicalwebapp.model.FileObjectFormat;
import lombok.Getter;

@Getter
public class ChatFileRequest {
    private String fileContent;
    private String fileName;
//    private FileObjectFormat format;
}
