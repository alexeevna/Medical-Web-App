package com.app.medicalwebapp.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;

    @Column(name = "real_name")
    private String realName;

    @Column(name = "mobile_phone")
    private String mobilePhone;

    @Column(name = "status")
    private Integer status;

    @Column(name = "rate")
    private Integer rate;

    public String getUsername() {
        return username;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public Long getId() {
        return this.id;
    }
}

