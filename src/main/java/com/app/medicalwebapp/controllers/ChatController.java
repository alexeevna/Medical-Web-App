package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.ChatMessageFileRequest;
import com.app.medicalwebapp.controllers.requestbody.MessageResponse;
import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.ChatMessage;
import com.app.medicalwebapp.model.mesages.StatusMessage;
import com.app.medicalwebapp.security.UserDetailsImpl;
import com.app.medicalwebapp.services.ChatMessageService;
import com.app.medicalwebapp.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    FileService fileService;

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

    @MessageMapping("/sendFile/{recipient}")
    public void sendMessageImg(@DestinationVariable("recipient") String recipient, @RequestParam ChatMessageFileRequest fileStringBase64) {
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] decodedFileByte = decoder.decode(fileStringBase64.getContentFile().split(",")[1]);
        try {
            fileService.saveFile("DAN4IK.png", decodedFileByte, 1L);
        } catch (Exception e) {
            e.printStackTrace();
        }
//        System.out.println(buff);
//        System.out.println(buff.length);
        System.out.println("hello");
        simpMessagingTemplate.convertAndSendToUser(recipient, "/private", fileStringBase64);
//        simpMessagingTemplate.convertAndSendToUser(recipient, "/private", chatMessage);
    }

    private UserDetailsImpl getAuthenticatedUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}