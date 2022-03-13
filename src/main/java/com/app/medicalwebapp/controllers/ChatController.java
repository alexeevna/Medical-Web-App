package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.ChatMessage;
import com.app.medicalwebapp.model.mesages.StatusMessage;
import com.app.medicalwebapp.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ChatMessageService chatMessageService;

    @MessageMapping("/send/{recipient}")
    public void sendMessage(@DestinationVariable("recipient") String recipient, @Payload ChatMessage chatMessage) {
        Long chatId = (chatMessage.getSenderId() + chatMessage.getRecipientId()) % 10_000; /*TODO. FIX THIS CHAT ID*/
        chatMessage.setChatId(chatId);
        chatMessage.setStatusMessage(StatusMessage.UNREAD);
        chatMessageService.save(chatMessage);
        simpMessagingTemplate.convertAndSendToUser(recipient, "/private", chatMessage);
    }
}