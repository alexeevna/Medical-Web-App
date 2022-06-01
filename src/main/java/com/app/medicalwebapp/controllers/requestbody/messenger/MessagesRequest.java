package com.app.medicalwebapp.controllers.requestbody.messenger;

import com.app.medicalwebapp.model.messengerModels.ChatMessage;
import lombok.Getter;

import java.util.List;

@Getter
public class MessagesRequest {
    private List<ChatMessage> messages;
}
