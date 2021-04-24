package com.app.medicalwebapp.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("/all")
    public String allAccess() {
        return "Общая информация";
    }

    @GetMapping("/user")
    public String userAccess() {
        return "Доступные пайплайны";
    }

    @GetMapping("/mod")
    public String moderatorAccess() {
        return "Информация о пайплайнах";
    }

    @GetMapping("/admin")
    public String adminAccess() {
        return "Информация для админа";
    }
}