package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.ChatMessage;
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
//@RequestMapping("/api/getmsg")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ChatMessageService chatMessageService;


    @MessageMapping("/send/{recipient}")
//    @SendTo("/topic/messages")
    public void sendMessage(@DestinationVariable("recipient") String recipient, @Payload ChatMessage chatMessage) {
//        try {
            System.out.println("hell1");
            String dst = "/messages/" + recipient;
//            System.out.println("/topic/messages/" + recipient);
//            System.out.println(chatMessage);
//        String chatId = chatMessageService.getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId());
        System.out.println(chatMessage.getContent());
            Long chatId = (chatMessage.getSenderId() + chatMessage.getRecipientId()) % 10_000; /*TODO. FIX THIS CHAT ID*/
            chatMessage.setChatId(chatId);
//            chatMessage.setSendDate(chatMessage.getSendDate());

//            System.out.println(chatMessage);
            chatMessageService.save(chatMessage);
//        return chatMessage;
            simpMessagingTemplate.convertAndSendToUser(recipient, "/private", chatMessage);
//            return ResponseEntity.ok().body(chatMessage);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }

    }

//    @GetMapping("/allMessages")
//    public ResponseEntity<?> getMessages(
//            @RequestParam Long senderId, @RequestParam Long recipientId
//    ) {
//        try {
//            var messages = chatMessageService.findMessages(senderId, recipientId);
//            System.out.println(messages.get(0));
//            System.out.println("hello2");
//            return ResponseEntity.ok().body(messages);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}