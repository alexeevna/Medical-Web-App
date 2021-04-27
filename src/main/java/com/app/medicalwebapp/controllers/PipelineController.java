package com.app.medicalwebapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/pipelines")
public class PipelineController {

    @Autowired

    @GetMapping("/all")
    public ResponseEntity<?> getAllPipelines() {
        return null;
    }

}
