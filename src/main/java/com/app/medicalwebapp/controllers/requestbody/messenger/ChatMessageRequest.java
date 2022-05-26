package com.app.medicalwebapp.controllers.requestbody.messenger;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ChatMessageRequest {
    private Long senderId;

    private Long recipientId;

    private String senderName;

    private String recipientName;

    private String content;

    private  List<ChatFileRequest> localFiles;

    private LocalDateTime sendDate;

//    List<Pair<String, String>> attachments;

}
