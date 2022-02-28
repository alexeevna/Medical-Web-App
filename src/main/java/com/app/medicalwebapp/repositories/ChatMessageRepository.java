package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.mesages.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    long countBySenderIdAndRecipientId(Long senderId, Long recipientId);

    Optional<List<ChatMessage>> findByChatId(String chatId);
}
