package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.Record;
import com.app.medicalwebapp.model.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

    Page<Record> findAll(Pageable pageable);

    Page<Record> findByTopics(Topic topic, Pageable pageable);

    Page<Record> findByTitleContaining(String title, Pageable pageable);

}
