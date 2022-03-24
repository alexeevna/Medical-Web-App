package com.app.medicalwebapp.services;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.Contact;
import com.app.medicalwebapp.repositories.ContactsRepository;
import com.app.medicalwebapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactsService {

    @Autowired
    private ContactsRepository contactsRepository;

    public Optional<Contact> getByContactsOwner(String contactsOwner) {
        Optional<Contact> contact = Optional.empty();
        try {
            contact = contactsRepository.findByContactsOwner(contactsOwner);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return contact;
    }
}
