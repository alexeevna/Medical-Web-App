package com.app.medicalwebapp.controllers.requestbody.messenger;

import com.app.medicalwebapp.model.messengerModels.ChatMessage;
import lombok.Getter;

@Getter
public class ChatMessageDeletionRequest {
    private ChatMessage message;
}
