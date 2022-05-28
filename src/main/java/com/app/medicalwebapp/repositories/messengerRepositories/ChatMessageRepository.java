package com.app.medicalwebapp.repositories.messengerRepositories;

import com.app.medicalwebapp.model.messengerModels.ChatMessage;
import com.app.medicalwebapp.model.messengerModels.StatusMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    long countBySenderIdAndRecipientId(Long senderId, Long recipientId);

    Optional<List<ChatMessage>> findByChatIdOrderBySendDateAsc(String chatId);

    Optional<ChatMessage> findFirstByChatIdOrderBySendDateDesc(String chatId);

    Optional<List<ChatMessage>> findByRecipientIdAndStatusMessageOrderBySendDateAsc(Long recipientId, StatusMessage UNREAD);

    ChatMessage findBySendDateAndChatId(LocalDateTime sendDate, String chatId);
}
