package com.app.medicalwebapp.services;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.Contacts;
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

    public Optional<Contacts> getByContactsOwner(String contactsOwner) {
        Optional<Contacts> contacts = Optional.empty();
        try {
            contacts = contactsRepository.findByContactsOwner(contactsOwner);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return contacts;
    }
}
