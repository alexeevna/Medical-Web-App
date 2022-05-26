package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.messenger.ContactsResponse;
import com.app.medicalwebapp.controllers.requestbody.MessageResponse;
import com.app.medicalwebapp.controllers.requestbody.PushContactsRequest;
import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.messengerModels.ChatMessage;
import com.app.medicalwebapp.model.messengerModels.Contact;
import com.app.medicalwebapp.repositories.messengerRepositories.ChatMessageRepository;
import com.app.medicalwebapp.repositories.messengerRepositories.ContactsRepository;
import com.app.medicalwebapp.security.UserDetailsImpl;
import com.app.medicalwebapp.services.messengerServices.ContactsService;
import com.app.medicalwebapp.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private ChatMessageRepository chatMessageRepository;

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

    @PostMapping("/uploadAvatar")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            userService.uploadUserAvatar(file.getBytes(), getAuthenticatedUser().getId());
            return ResponseEntity.ok().body(new MessageResponse("Успешно загружены файлы: " + file.getOriginalFilename()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse("Ошибка при загрузке файлa"));
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

    @GetMapping("/getContacts")
    public ResponseEntity<?> getContacts(@RequestParam String currentUserUsername) {
        try {
            Optional<Contact> contactOptional = contactsService.getByContactsOwner(currentUserUsername);
            List<User> contactsList = new ArrayList<>();
//            Map<User, ChatMessage> contactWithLastMsg = new HashMap<>();
            ContactsResponse contactWithLastMsg = new ContactsResponse();
            contactWithLastMsg.setContactWithLastMsg(new ArrayList<>());
//            contactWithLastMsg.setLastMessages(new ArrayList<>());
            var contacts = contactWithLastMsg.getContactWithLastMsg();
            if (contactOptional.isPresent()) {
                contactsList = contactOptional.get().getContactsList();
                for (User user : contactsList) {
                    String chatId;
                    if (user.getUsername().compareTo(currentUserUsername) < 0) {
                        chatId = (user.getUsername() + currentUserUsername);
                    } else {
                        chatId = (currentUserUsername + user.getUsername());
                    }
                    Optional<ChatMessage> lastMessage = chatMessageRepository.findFirstByChatIdOrderBySendDateDesc(chatId);

                    if (lastMessage.isPresent()) {
//                        var contactList = contactWithLastMsg.getContacts();
//                        contactList.add(user);
//                        var lastMsg = contactWithLastMsg.getLastMessages();
//                        lastMsg.add(lastMessage.get());

                        contacts.add(Pair.of(user, lastMessage.get()));
                        //                        contactWithLastMsg.setContacts(contactList);
//                        contactWithLastMsg.setLastMessages(lastMsg);
                    } else {
                        contacts.add(Pair.of(user, new ChatMessage()));
//                        contacts.put(user, new ChatMessage());
                        //                        var contactList = contactWithLastMsg.getContacts();
//                        contactList.add(user);
//                        contactWithLastMsg.setContacts(contactList);
                    }
                }
                contactWithLastMsg.setContactWithLastMsg(contacts);
            }
            return ResponseEntity.ok().body(contactWithLastMsg);
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
        Optional<User> userOptional = userService.getOneByUsername(selectedUserUsername);
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            return null;
        }
        List<User> userList = contact.getContactsList();
        userList.add(user);
        contact.setContactsList(userList);
        contactsRepository.save(contact);
        return user;
    }

    private UserDetailsImpl getAuthenticatedUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
