package com.app.medicalwebapp.controllers.requestbody;

import com.app.medicalwebapp.model.messages.ChatMessage;
import lombok.Getter;

import java.util.List;

@Getter
public class MessagesRequest {
    List<ChatMessage> messages;
}
