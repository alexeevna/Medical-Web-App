package com.app.medicalwebapp.controllers.requestbody;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String realName;
    private String mobilePhone;
    private int rate;
    private int status;
    //private String chosenRole;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username,
                       List<String> roles, String realName, String mobilePhone, int rate, int status) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.roles = roles;
        this.realName = realName;
        this.mobilePhone = mobilePhone;
        this.rate = rate;
        this.status = status;
    }
}