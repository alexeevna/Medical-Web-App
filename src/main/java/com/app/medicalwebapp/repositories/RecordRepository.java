package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.Record;
import com.app.medicalwebapp.model.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

    Page<Record> findAll(Pageable pageable);

    Page<Record> findByTopics(Topic topic, Pageable pageable);

    Page<Record> findByParentAndTitleContainingIgnoreCaseOrderByCreationTimeDesc(Long parent, String title, Pageable pageable);

    Page<Record> findByParentAndTopicsAndTitleContainingIgnoreCaseOrderByCreationTimeDesc(Long parent, Topic topic, String title, Pageable pageable);

    List<Record> findByParentOrderByCreationTimeDesc(Long parent);

    Page<Record> findByParentOrderByCreationTimeDesc(Long parent, Pageable pageable);

    Page<Record> findByParentAndTopicsOrderByCreationTimeDesc(Long parent, Topic topic, Pageable pageable);

}
