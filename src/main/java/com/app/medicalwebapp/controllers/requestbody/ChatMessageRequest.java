package com.app.medicalwebapp.controllers.requestbody;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.ChatMessage;
import lombok.Getter;
import org.springframework.data.util.Pair;

import javax.persistence.Column;
import java.util.List;
import java.util.Map;

@Getter
public class ChatMessageRequest {
    private Long senderId;

    private Long recipientId;

    private String senderName;

    private String recipientName;

    private String content;

    private  List<ChatFileRequest> localFiles;

//    List<Pair<String, String>> attachments;

}
