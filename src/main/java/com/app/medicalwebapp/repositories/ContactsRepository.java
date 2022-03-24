package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.model.mesages.ChatMessage;
import com.app.medicalwebapp.model.mesages.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactsRepository extends JpaRepository<Contact, Long> {

    Optional<Contact> findByContactsOwner(String contactsOwner);
}
