package com.app.medicalwebapp.controllers.requestbody;

import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@ToString
public class SignInRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}