package com.app.medicalwebapp.security.data.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class SignInRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}