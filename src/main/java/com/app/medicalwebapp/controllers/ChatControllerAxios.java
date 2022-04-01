package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.MessagesRequest;
import com.app.medicalwebapp.model.mesages.ChatMessage;
import com.app.medicalwebapp.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 604800)
@RestController
@RequestMapping("/api/msg")
public class ChatControllerAxios {

    @Autowired
    private ChatMessageService chatMessageService;

    @GetMapping("/allMessages")
    public ResponseEntity<?> getMessages(
            @RequestParam String senderUsername, @RequestParam String recipientUsername
    ) {
        try {
            var messages = chatMessageService.findMessages(senderUsername, recipientUsername);
            return ResponseEntity.ok().body(messages);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/unreadMessages")
    public ResponseEntity<?> getUnreadMessages(
            @RequestParam Long recipientId
    ) {
        try {
            var messages = chatMessageService.findUnreadMessages(recipientId);
            return ResponseEntity.ok().body(messages);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/updateMessages")
    public ResponseEntity<?> updateMessages(
            @Valid @RequestBody MessagesRequest request
    ) {
        try {
            chatMessageService.updateUnreadMessages(request.getMessages());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
