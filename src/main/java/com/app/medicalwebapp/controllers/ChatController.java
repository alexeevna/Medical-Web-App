package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.messenger.ChatFileRequest;
import com.app.medicalwebapp.controllers.requestbody.messenger.ChatMessageRequest;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.model.messengerModels.ChatFile;
import com.app.medicalwebapp.model.messengerModels.ChatMessage;
import com.app.medicalwebapp.model.messengerModels.StatusMessage;
import com.app.medicalwebapp.repositories.messengerRepositories.ChatFileRepository;
import com.app.medicalwebapp.services.messengerServices.ChatFileService;
import com.app.medicalwebapp.services.messengerServices.ChatMessageService;
import com.app.medicalwebapp.services.FileService;
import com.app.medicalwebapp.utils.FileFormatResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ChatMessageService chatMessageService;

    @MessageMapping("/send/{recipient}")
    public void sendMessage(@DestinationVariable("recipient") String recipient, @RequestParam ChatMessageRequest msg) {
        try {
            var chatMessage = chatMessageService.save(msg);
            simpMessagingTemplate.convertAndSendToUser(recipient, "/private", chatMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}