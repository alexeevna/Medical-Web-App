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

    List<Pair<User, ChatMessage>> contactWithLastMsg;

}
