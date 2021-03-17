package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.security.data.request.SignInRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/files")
public class FileObjectController {

    @PostMapping
    public ResponseEntity<?> uploadFileObject(@Valid @RequestBody SignInRequest signInRequest) {
        return null;
    }
}
