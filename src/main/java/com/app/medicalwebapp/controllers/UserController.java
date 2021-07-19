package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.MessageResponse;
import com.app.medicalwebapp.controllers.requestbody.RecordCreationRequest;
import com.app.medicalwebapp.controllers.requestbody.RecordsPageResponse;
import com.app.medicalwebapp.controllers.requestbody.UserResponse;
import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.security.UserDetailsImpl;
import com.app.medicalwebapp.services.RecordService;
import com.app.medicalwebapp.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 604800)
@RestController
@RequestMapping("/api/search")
public class UserController {
    Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @GetMapping("/all/users")
    public ResponseEntity<?> getAllUsers(
            @RequestParam(required = false) String login
    ) {
        try {
            Optional<User> responseBody;
            responseBody = userService.getByUsername(login);
            System.out.println("UserController.java");
            System.out.println(responseBody);
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
