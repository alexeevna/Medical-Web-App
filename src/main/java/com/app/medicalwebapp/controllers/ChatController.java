package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.messenger.ChatFileRequest;
import com.app.medicalwebapp.controllers.requestbody.messenger.ChatMessageRequest;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.model.messengerModels.ChatFile;
import com.app.medicalwebapp.model.messengerModels.ChatMessage;
import com.app.medicalwebapp.model.messengerModels.StatusMessage;
import com.app.medicalwebapp.repositories.messengerRepositories.ChatFileRepository;
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

    @Autowired
    ChatFileRepository chatFileRepository;
    @Autowired
    FileService fileService;

    @MessageMapping("/send/{recipient}")
    public void sendMessage(@DestinationVariable("recipient") String recipient, @RequestParam ChatMessageRequest msg) {
        try {
            List<FileObject> files = new ArrayList<>();
//            System.out.println(msg.getSendDate());
//            System.out.println(LocalDateTime.now());
//            System.out.println(msg.getLocalFiles().get(0));
//            List<String> filesBase64 = new ArrayList<>();
            List<ChatFile> localFiles = new ArrayList<>();
//            Map<String, String> localFiles = new HashMap<>();
//            List<byte[]> filesDataBlob = new ArrayList<>();
            if (msg.getLocalFiles() != null) {
                for (ChatFileRequest file : msg.getLocalFiles()) {
                    FileObjectFormat fileFormat = FileFormatResolver.resolveFormat(file.getFileName());
                    Base64.Decoder decoder = Base64.getDecoder();
                    String fileBase64 = file.getFileContent().split(",")[1];
                    byte[] decodedFileByte = decoder.decode(fileBase64);
                    if (fileFormat == FileObjectFormat.DICOM) {
                        files.add(fileService.saveFile(file.getFileName(), decodedFileByte, msg.getSenderId(), ""));
                        //TODO вытащить UID из файла
                    } else {
                        ChatFile localFile = new ChatFile();
                        localFile.setFileName(file.getFileName());
                        localFile.setFileContent(decodedFileByte);
                        localFile.setFormat(fileFormat);
                        var fl = chatFileRepository.save(localFile);
                        localFiles.add(fl);
                    }
                }
            }
            String chatId;
            if (msg.getSenderName().compareTo(msg.getRecipientName()) < 0) {
                chatId = (msg.getSenderName() + msg.getRecipientName());
            } else {
                chatId = (msg.getRecipientName() + msg.getSenderName());
            }
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setChatId(chatId);
            chatMessage.setRecipientId(msg.getRecipientId());
            chatMessage.setSenderId(msg.getSenderId());
            chatMessage.setRecipientName(msg.getRecipientName());
            chatMessage.setSenderName(msg.getSenderName());
            chatMessage.setContent(msg.getContent());
            chatMessage.setStatusMessage(StatusMessage.UNREAD);
            chatMessage.setSendDate(msg.getSendDate());
            chatMessage.setAttachments(files);
            chatMessage.setLocalFiles(localFiles);
//            System.out.println(chatMessage);
            chatMessageService.save(chatMessage);
            simpMessagingTemplate.convertAndSendToUser(recipient, "/private", chatMessage);
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