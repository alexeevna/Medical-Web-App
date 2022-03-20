package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.PushContactsRequest;
import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 604800)
@RestController
@RequestMapping("/api/search")
public class UserController {
    Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @GetMapping("/allByUsername")
    public ResponseEntity<?> getAllByUsername(
            @RequestParam(name = "username", required = false, defaultValue = "empty") String username
    ) {
        try {
            if (username.equals("empty")) {
                List<User> responseBody;
                responseBody = userService.getAll();
                return ResponseEntity.ok().body(responseBody);
            } else {
                Optional<User> responseBody;
                List<Optional<User>> responseBody2 = new ArrayList<>();
                responseBody = userService.getOneByUsername(username);
                if (responseBody.isPresent()) {
                    responseBody2.add(responseBody);
                }
                return ResponseEntity.ok().body(responseBody2);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/byUsername")
    public ResponseEntity<?> getByUsername(
            @RequestParam(name = "username", required = false, defaultValue = "empty") String username,
            @RequestParam String role
    ) {
        try {
            if (username.equals("empty")) {
                List<User> responseBody;
                responseBody = userService.getAllByRole(role);
                return ResponseEntity.ok().body(responseBody);
            } else {
                Optional<User> responseBody;
                List<Optional<User>> responseBody2 = new ArrayList<>();
                responseBody = userService.getOneByUsernameAndRole(username, role);
                if (responseBody.isPresent()) {
                    responseBody2.add(responseBody);
                }
                return ResponseEntity.ok().body(responseBody2);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/allByInitials")
    public ResponseEntity<?> getAllByInitials(
            @RequestParam(name = "initials", required = false, defaultValue = "empty") String initials
    ) {
        try {
            if (initials.equals("empty")) {
                List<User> responseBody;
                responseBody = userService.getAll();
                return ResponseEntity.ok().body(responseBody);
            } else {
                List<User> responseBody;
                responseBody = userService.getByInitials(initials);
                return ResponseEntity.ok().body(responseBody);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/byInitials")
    public ResponseEntity<?> getByInitials(
            @RequestParam(name = "initials", required = false, defaultValue = "empty") String initials,
            @RequestParam String role
    ) {
        try {
            if (initials.equals("empty")) {
                List<User> responseBody;
                responseBody = userService.getAllByRole(role);
                return ResponseEntity.ok().body(responseBody);
            } else {
                List<User> responseBody;
                responseBody = userService.getByInitialsAndRole(initials, role);
                return ResponseEntity.ok().body(responseBody);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/getContacts")
//    public ResponseEntity<?> getContacts(@RequestParam String currentUserUsername) {
//        try {
//            Optional<User> userOpt = userService.getOneByUsername(currentUserUsername);
//            User user;
//            if (userOpt.isPresent()) {
//                user = userOpt.get();
//            } else {
//                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//            return ResponseEntity.ok().body(user.getContacts());
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @PostMapping("/pushContacts")
//    public ResponseEntity<?> pushContacts(
//            @RequestBody PushContactsRequest request
//    ) {
//        try {
//            Optional<User> userOpt = userService.getOneByUsername(request.getCurrentUserUsername());
//            User user;
//            if (userOpt.isPresent()) {
//                user = userOpt.get();
//            } else {
//                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//
//            Optional<User> userOpt2 = userService.getOneByUsername(request.getSelectedUserUsername());
//            User user2;
//            if (userOpt2.isPresent()) {
//                user2 = userOpt2.get();
//            } else {
//                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//            List<User> userContacts = user.getContacts();
//            userContacts.add(user2);
//            user.setContacts(userContacts);
//            userService.save(user);
//
//            List<User> userContacts2 = user2.getContacts();
//            userContacts2.add(user);
//            user2.setContacts(userContacts2);
//            userService.save(user2);
//
//            return ResponseEntity.ok().body(user2);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

}
