package com.app.medicalwebapp.controllers.requestbody;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SignUpRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 10)
    private String chosenRole;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    private String mobilePhone;
    private String realName;

}
