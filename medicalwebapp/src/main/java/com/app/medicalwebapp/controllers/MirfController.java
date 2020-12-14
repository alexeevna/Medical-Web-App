package com.app.medicalwebapp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;

@RestController
@RequestMapping("/mirf")
public class MirfController {

    @PostMapping("/")
    public ResponseEntity<?> receivePipelineResult(@RequestBody final Path pathToFile,
                                                   @RequestBody final String message) {
        return ResponseEntity.ok("Pipeline ended with success");
    }


}
