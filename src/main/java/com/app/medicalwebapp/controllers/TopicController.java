package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 604800)
@RestController
@RequestMapping("/api/topics")
public class TopicController {

    @Autowired
    TopicRepository topicRepository;

    @GetMapping
    public ResponseEntity<?> getAllTopics() {
        try {
            return ResponseEntity.ok().body(topicRepository.findAll());
        } catch (Exception ex) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public void createNewTopic(@RequestParam String topicName) {
    }

}
