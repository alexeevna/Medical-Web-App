package com.app.medicalwebapp.controllers.requestbody;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ChatMessageDeleteByTimeAndChatIdRequest {
    private LocalDateTime time;
    private String senderName;
    private String recipientName;
}
