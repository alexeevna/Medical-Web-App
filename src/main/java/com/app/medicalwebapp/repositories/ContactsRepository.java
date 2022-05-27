package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.messages.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContactsRepository extends JpaRepository<Contact, Long> {

    Optional<Contact> findByContactsOwner(String contactsOwner);
}
