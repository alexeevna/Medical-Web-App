package com.app.medicalwebapp.model.mesages;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "chatmessages")
@Data
@DynamicUpdate
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "chatId")
    private String chatId;

    @Column(name = "senderId")
    private Long senderId;

    @Column(name = "recipientId")
    private Long recipientId;

    @Column(name = "senderName")
    private String senderName;

    @Column(name = "recipientName")
    private String recipientName;

    @Column(name = "content")
    @Size(max = 3000)
    private String content;

    @Column(name = "sendDate")
    private LocalDateTime sendDate;

    @Column(name = "statusMessage")
    private StatusMessage statusMessage;
}
