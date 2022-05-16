package com.app.medicalwebapp.controllers.requestbody;

import com.app.medicalwebapp.model.mesages.ChatMessage;
import lombok.Getter;

import java.util.List;

@Getter
public class ChatMessageDeleteRequest {
    ChatMessage message;
}
