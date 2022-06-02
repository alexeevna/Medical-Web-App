package com.app.medicalwebapp.services.messenger_services;

import com.app.medicalwebapp.model.messenger_models.Contact;
import com.app.medicalwebapp.repositories.messenger_repositories.ContactsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Contact save(Contact contact) {
        return contactsRepository.save(contact);
    }
}
