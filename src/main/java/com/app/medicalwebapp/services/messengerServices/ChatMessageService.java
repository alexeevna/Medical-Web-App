package com.app.medicalwebapp.services.messengerServices;

import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.model.messengerModels.ChatMessage;
import com.app.medicalwebapp.model.messengerModels.StatusMessage;
import com.app.medicalwebapp.repositories.messengerRepositories.ChatMessageRepository;
import com.app.medicalwebapp.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ChatMessageService {
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    FileService fileService;

    public ChatMessage save(ChatMessage chatMessage) {
        chatMessageRepository.save(chatMessage);
        return chatMessage;
    }

    public long countNewMessages(Long senderId, Long recipientId) {
        return chatMessageRepository.countBySenderIdAndRecipientId(
                senderId, recipientId);
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

