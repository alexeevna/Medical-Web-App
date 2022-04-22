package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.ChatMessageRequest;
import com.app.medicalwebapp.controllers.requestbody.MessageResponse;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.ChatMessage;
import com.app.medicalwebapp.model.mesages.StatusMessage;
import com.app.medicalwebapp.security.UserDetailsImpl;
import com.app.medicalwebapp.services.ChatMessageService;
import com.app.medicalwebapp.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
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
import java.util.stream.Collectors;

@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    FileService fileService;

    @MessageMapping("/send/{recipient}")
    public void sendMessage(@DestinationVariable("recipient") String recipient, @RequestParam ChatMessageRequest msg) {
        try {
            var hey = (msg.getFileNameAndStringBase64().stream().map(Pair::getFirst).collect(Collectors.toList()));
            System.out.println(hey);
//            List<FileObject> files = new ArrayList<>();
//            byte[] decodedFileByte;
//            if (msg.getContentStringFileBase64() != null) {
//                Base64.Decoder decoder = Base64.getDecoder();
//                decodedFileByte = decoder.decode(msg.getContentStringFileBase64().split(",")[1]);
//                files.add(fileService.saveFile(msg.getFileName(), decodedFileByte, msg.getSenderId()));
//            }
//            String chatId;
//            if (msg.getSenderName().compareTo(msg.getRecipientName()) < 0) {
//                chatId = (msg.getSenderName() + msg.getRecipientName());
//            } else {
//                chatId = (msg.getRecipientName() + msg.getSenderName());
//            }
//            ChatMessage chatMessage = new ChatMessage();
//            chatMessage.setChatId(chatId);
//            chatMessage.setRecipientId(msg.getRecipientId());
//            chatMessage.setSenderId(msg.getSenderId());
//            chatMessage.setRecipientName(msg.getRecipientName());
//            chatMessage.setSenderName(msg.getSenderName());
//            chatMessage.setContent(msg.getContent());
//            chatMessage.setStatusMessage(StatusMessage.UNREAD);
//            chatMessage.setSendDate(LocalDateTime.now());
//            chatMessage.setAttachments(files);
//            System.out.println(msg.getContentStringFileBase64());
//            System.out.println(chatMessage);
//            chatMessageService.save(chatMessage);
//            simpMessagingTemplate.convertAndSendToUser(recipient, "/private", chatMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

//    @MessageMapping("/sendFile/{recipient}")
//    public void sendMessageImg(@DestinationVariable("recipient") String recipient, @RequestParam ChatMessageRequest fileStringBase64) {
//        Base64.Decoder decoder = Base64.getDecoder();
//        byte[] decodedFileByte = decoder.decode(fileStringBase64.getContentFile().split(",")[1]);
//        try {
//            fileService.saveFile("DAN4IK.png", decodedFileByte, getAuthenticatedUser().getId());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
////        System.out.println(buff);
////        System.out.println(buff.length);
//        System.out.println("hello");
//        simpMessagingTemplate.convertAndSendToUser(recipient, "/private", fileStringBase64);
////        simpMessagingTemplate.convertAndSendToUser(recipient, "/private", chatMessage);
//    }
//
//    private UserDetailsImpl getAuthenticatedUser() {
//        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//    }
}