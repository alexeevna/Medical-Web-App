package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

}
