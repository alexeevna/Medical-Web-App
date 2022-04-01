package com.app.medicalwebapp.controllers.requestbody;

import com.app.medicalwebapp.model.User;
import lombok.Getter;

@Getter
public class PushContactsRequest {
    String currentUserUsername;
    String selectedUserUsername;
}
