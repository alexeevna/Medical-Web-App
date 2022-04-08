package com.app.medicalwebapp.controllers.requestbody;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.ChatMessage;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.util.Pair;

import java.util.List;

@Getter
@Setter
public class ContactsResponse {
//    List<User> contacts;
//    List<ChatMessage> lastMessages;

    //    Map<User, ChatMessage> contactWithLastMsg;
    List<Pair<User, ChatMessage>> contactWithLastMsg;

}
