package com.app.medicalwebapp.controllers.requestbody.messenger;

import com.app.medicalwebapp.model.User;
import lombok.Getter;

@Getter
public class ContactsRequest {
    private String currentUserUsername;
    private String selectedUserUsername;
}
