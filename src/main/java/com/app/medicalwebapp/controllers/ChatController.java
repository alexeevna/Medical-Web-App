package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.model.messages.ChatMessage;
import com.app.medicalwebapp.model.messages.StatusMessage;
import com.app.medicalwebapp.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ChatMessageService chatMessageService;

    @MessageMapping("/send/{recipient}")
    public void sendMessage(@DestinationVariable("recipient") String recipient, @Payload ChatMessage chatMessage) {
        String chatId;
        if (chatMessage.getSenderName().compareTo(chatMessage.getRecipientName()) < 0) {
            chatId = (chatMessage.getSenderName() + chatMessage.getRecipientName());
        } else {
            chatId = (chatMessage.getRecipientName() + chatMessage.getSenderName());
        }
        chatMessage.setChatId(chatId);
        chatMessage.setStatusMessage(StatusMessage.UNREAD);
        chatMessage.setSendDate(LocalDateTime.now());
        chatMessageService.save(chatMessage);
        simpMessagingTemplate.convertAndSendToUser(recipient, "/private", chatMessage);
    }
}