package com.app.medicalwebapp.controllers.requestbody.messenger;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ChatMessageDeletionTimeChatIdRequest {
    private LocalDateTime time;
    private String senderName;
    private String recipientName;
}
