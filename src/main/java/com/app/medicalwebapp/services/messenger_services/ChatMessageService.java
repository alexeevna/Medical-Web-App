package com.app.medicalwebapp.services.messenger_services;

import com.app.medicalwebapp.controllers.requestbody.messenger.ChatFileRequest;
import com.app.medicalwebapp.controllers.requestbody.messenger.ChatMessageRequest;
import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.model.messenger_models.ChatFile;
import com.app.medicalwebapp.model.messenger_models.ChatMessage;
import com.app.medicalwebapp.model.messenger_models.StatusMessage;
import com.app.medicalwebapp.repositories.messenger_repositories.ChatMessageRepository;
import com.app.medicalwebapp.services.FileService;
import com.app.medicalwebapp.utils.FileFormatResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;


@Service
public class ChatMessageService {
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private ChatFileService chatFileService;

    @Autowired
    private FileService fileService;

    public ChatMessage save(ChatMessageRequest msg) throws Exception {
        List<FileObject> files = new ArrayList<>();
        List<ChatFile> localFiles = new ArrayList<>();
        if (msg.getLocalFiles() != null) {
            for (ChatFileRequest file : msg.getLocalFiles()) {
                FileObjectFormat fileFormat = FileFormatResolver.resolveFormat(file.getFileName());
                Base64.Decoder decoder = Base64.getDecoder();
                String fileBase64 = file.getFileContent().split(",")[1];
                byte[] decodedFileByte = decoder.decode(fileBase64);
                if (fileFormat == FileObjectFormat.DICOM) {
                    files.add(fileService.saveFile(file.getFileName(), decodedFileByte, msg.getSenderId(), msg.getUid()));
                } else {
                    ChatFile localFile = new ChatFile();
                    localFile.setFileName(file.getFileName());
                    localFile.setFileContent(decodedFileByte);
                    localFile.setFormat(fileFormat);
                    var fl = chatFileService.save(localFile);
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
        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> findMessages(String senderUsername, String recipientUsername) throws Exception {
        String chatId;
        if (senderUsername.compareTo(recipientUsername) < 0) {
            chatId = (senderUsername + recipientUsername);
        } else {
            chatId = (recipientUsername + senderUsername);
        }
        List<ChatMessage> messages;
        Optional<List<ChatMessage>> messagesOptional = chatMessageRepository.findByChatIdOrderBySendDateAsc(chatId);
        messages = messagesOptional.orElseGet(ArrayList::new);

        if (messages.size() > 0) {
            getImages(messages);
        }

        return messages;
    }

    public List<ChatMessage> getImages(List<ChatMessage> messages) throws Exception {
        for (ChatMessage message : messages) {
            if (message.getAttachments().size() > 0) {
                ArrayList<byte[]> data = new ArrayList<>();
                message.setDataFilesDicom(data);
                for (int j = 0; j < message.getAttachments().size(); j++) {
                    if (message.getAttachments().get(j).getFormat() == FileObjectFormat.DICOM) {
                        FileObject fileObject = message.getAttachments().get(j);
                        byte[] fileContent = fileService.previewFile(fileObject);
                        message.getDataFilesDicom().add(fileContent);
                        message.getUidFilesDicom().add(message.getAttachments().get(j).getUID());
                    }
                }
            }
        }
        return messages;
    }

    public List<ChatMessage> findUnreadMessages(Long recipientId) {
        List<ChatMessage> messages;
        Optional<List<ChatMessage>> messagesOptional = chatMessageRepository.findByRecipientIdAndStatusMessageOrderBySendDateAsc(recipientId, StatusMessage.UNREAD);
        messages = messagesOptional.orElseGet(ArrayList::new);
        return messages;
    }

    public void updateUnreadMessages(List<ChatMessage> messages) {
        for (ChatMessage message : messages) {
            message.setStatusMessage(StatusMessage.READ);
            chatMessageRepository.save(message);
        }
    }

    public void deleteMessage(ChatMessage message) {
        chatMessageRepository.delete(message);
    }

    public void deleteMsgByTimeAndChatId(LocalDateTime time, String senderUsername, String recipientUsername) {
        String chatId;
        if (senderUsername.compareTo(recipientUsername) < 0) {
            chatId = (senderUsername + recipientUsername);
        } else {
            chatId = (recipientUsername + senderUsername);
        }
        ChatMessage messageToDelete = chatMessageRepository.findBySendDateAndChatId(time, chatId);
        chatMessageRepository.delete(messageToDelete);
    }

    public Optional<ChatMessage> findFirstByChatIdOrderBySendDateDesc(String chatId) {
        return chatMessageRepository.findFirstByChatIdOrderBySendDateDesc(chatId);
    }
}

