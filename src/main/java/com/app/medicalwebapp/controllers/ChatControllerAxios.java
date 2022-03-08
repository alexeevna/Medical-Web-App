package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 604800)
@RestController
@RequestMapping("/api/msg")
public class ChatControllerAxios {

    @Autowired
    private ChatMessageService chatMessageService;

    @GetMapping("/allMessages")
    public ResponseEntity<?> getMessages(
            @RequestParam Long senderId, @RequestParam Long recipientId
    ) {
        try {
            System.out.println(senderId);
            System.out.println(recipientId);
            var messages = chatMessageService.findMessages(senderId, recipientId);
//            System.out.println(messages.get(0));
//            System.out.println("hello2");
            return ResponseEntity.ok().body(messages);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
