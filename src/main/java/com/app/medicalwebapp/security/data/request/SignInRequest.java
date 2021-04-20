package com.app.medicalwebapp.security.data.request;

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