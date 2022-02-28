package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.ChatMessage;
import com.app.medicalwebapp.model.mesages.ChatRoom;
import com.app.medicalwebapp.services.ChatMessageService;
import com.app.medicalwebapp.services.ChatRoomService;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
//@RequestMapping("/api/messages2")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ChatMessageService chatMessageService;
    @Autowired
    private ChatRoomService chatRoomService;

    @MessageMapping("/send/{recipient}")
//    @SendTo("/topic/messages")
    public ChatMessage sendMessage(@DestinationVariable("recipient") String recipient, @Payload ChatMessage chatMessage) {
        String dst = "/topic/messages/" + recipient;
        System.out.println("/topic/messages/" + recipient);
        System.out.println(chatMessage);
        String chatId = chatRoomService.getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId());
        chatMessage.setChatId(chatId);
        System.out.println(chatMessage);
        chatMessageService.save(chatMessage);
//        return chatMessage;
        simpMessagingTemplate.convertAndSend(dst, chatMessage);
        return chatMessage;
    }

    @GetMapping("/allMessages")
    public ResponseEntity<?> getAllByUsername(
            @RequestParam String sender, @RequestParam String recipient
    ) {
        try {
            Optional<ChatRoom> chat = chatRoomRepository.findBySenderIdAndRecipientId(senderId, recipientId);
            if (chat.isPresent()) {
                return chat.get().getChatId();
            }
            String chatId = String.format("%s_%s", senderId, recipientId);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}