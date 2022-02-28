package com.app.medicalwebapp.services;

import com.app.medicalwebapp.model.mesages.ChatRoom;
import com.app.medicalwebapp.repositories.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomService {
    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public String getChatId(Long senderId, Long recipientId) {
        Optional<ChatRoom> chat = chatRoomRepository.findBySenderIdAndRecipientId(senderId, recipientId);
        if (chat.isPresent()) {
            return chat.get().getChatId();
        }
        String chatId = String.format("%s_%s", senderId, recipientId);
        System.out.println(chatId);
        ChatRoom senderRecipient = ChatRoom
                .builder()
                .chatId(chatId)
                .senderId(senderId)
                .recipientId(recipientId)
                .build();

        ChatRoom recipientSender = ChatRoom
                .builder()
                .chatId(chatId)
                .senderId(recipientId)
                .recipientId(senderId)
                .build();
        chatRoomRepository.save(senderRecipient);
        chatRoomRepository.save(recipientSender);
        return chatId;
    }
}
