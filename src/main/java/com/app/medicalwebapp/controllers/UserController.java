package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.PushContactsRequest;
import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.Contact;
import com.app.medicalwebapp.repositories.ContactsRepository;
import com.app.medicalwebapp.services.ContactsService;
import com.app.medicalwebapp.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 604800)
@RestController
@RequestMapping("/api/search")
public class UserController {
    Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @Autowired
    ContactsRepository contactsRepository;

    @Autowired
    ContactsService contactsService;

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
//            Optional<User> userOptional = userService.getOneByUsername(currentUserUsername);
//            List<User> contactsList = new ArrayList<>();
//            if (userOptional.isPresent()) {
//                contactsList = userOptional.get().getContactsList();
//            }
//            System.out.println("get " + currentUserUsername);
//            System.out.println("get " + userOptional);
//            System.out.println("get " + contactsList);
//            return ResponseEntity.ok().body(contactsList);
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
//            User user = push(request.getCurrentUserUsername(), request.getSelectedUserUsername());
////            if (push(request.getSelectedUserUsername(), request.getCurrentUserUsername()) == null) {
////                return ResponseEntity.badRequest().body("Пользователя с данным логином не существует");
////            }
//            if (user == null) {
//                return ResponseEntity.badRequest().body("Пользователя с данным логином не существует");
//            }
//            return ResponseEntity.ok().body(user);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    public User push(String currentUserUsername, String selectedUserUsername) {
//        Optional<User> userOptionalCurrent = userService.getOneByUsername(currentUserUsername);
//        User userCurrent;
//        List<User> contactsListCurrent = new ArrayList<>();
//        if (userOptionalCurrent.isPresent()) {
//            userCurrent = userOptionalCurrent.get();
//            contactsListCurrent = userCurrent.getContactsList();
//        } else {
//            System.out.println("bad req");
//            return null;
//        }
////        else {
//////            contact = new Contact();
//////            contact.setId((long) Math.random() * (10000L - 1L));
//////            contact.setContactsOwner(currentUserUsername);
//////            contact.setContactsList(new ArrayList<>());
////        }
//        System.out.println("daniel" + contactsListCurrent);
//        Optional<User> userOptionalSelected = userService.getOneByUsername(selectedUserUsername);
//        User userSelected;
//        List<User> contactsListSelected = new ArrayList<>();
//        if (userOptionalSelected.isPresent()) {
//            userSelected = userOptionalSelected.get();
//            contactsListSelected = userSelected.getContactsList();
//        } else {
//            System.out.println("bad req");
//            return null;
//        }
//        System.out.println("ya tuta");
//        contactsListCurrent.add(userSelected);
//        System.out.println("ya tuta2");
//        contactsListSelected.add(userCurrent);
//        userCurrent.setContactsList(contactsListCurrent);
//        userSelected.setContactsList(contactsListSelected);
////        System.out.println(userOptionalCurrent.get());
////        System.out.println(userOptionalSelected.get());
//        System.out.println("ya tuta3");
//        userService.save(userOptionalCurrent.get());
//        userService.save(userOptionalSelected.get());
//        return userOptionalSelected.get();
//    }


    @GetMapping("/getContacts")
    public ResponseEntity<?> getContacts(@RequestParam String currentUserUsername) {
        try {
            Optional<Contact> contactOptional = contactsService.getByContactsOwner(currentUserUsername);
            List<User> contactsList = new ArrayList<>();
            if (contactOptional.isPresent()) {
                contactsList = contactOptional.get().getContactsList();
            }
            System.out.println("get " + currentUserUsername);
            System.out.println("get " + contactOptional);
            System.out.println("get " + contactsList);
            return ResponseEntity.ok().body(contactsList);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/pushContacts")
    public ResponseEntity<?> pushContacts(
            @RequestBody PushContactsRequest request
    ) {
        try {
            User user = push(request.getCurrentUserUsername(), request.getSelectedUserUsername());
            if (push(request.getSelectedUserUsername(), request.getCurrentUserUsername()) == null) {
                return ResponseEntity.badRequest().body("Пользователя с данным логином не существует");
            }
            if (user == null) {
                return ResponseEntity.badRequest().body("Пользователя с данным логином не существует");
            }
            return ResponseEntity.ok().body(user);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public User push(String currentUserUsername, String selectedUserUsername) {
        Optional<Contact> contactsOptional = contactsService.getByContactsOwner(currentUserUsername);
        Contact contact;
        if (contactsOptional.isPresent()) {
            contact = contactsOptional.get();
        } else {
            contact = new Contact();
//            contact.setId((long) Math.random() * (10000L - 1L));
            contact.setContactsOwner(currentUserUsername);
            contact.setContactsList(new ArrayList<>());
        }
        System.out.println("daniel" + contact);
        Optional<User> userOptional = userService.getOneByUsername(selectedUserUsername);
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            System.out.println("bad req");
            return null;
        }
        List<User> userList = contact.getContactsList();
        userList.add(user);
        contact.setContactsList(userList);
        System.out.println(contact);
        System.out.println(user);
        System.out.println("SAVE");
        contactsRepository.save(contact);
        return user;
    }

}
