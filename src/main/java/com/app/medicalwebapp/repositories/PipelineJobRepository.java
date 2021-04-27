package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.PipelineJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PipelineJobRepository extends JpaRepository<PipelineJob, Long> {

    List<PipelineJob> findByCreator(Long id);

    List<PipelineJob> findByMirfSessionid(String mirfSessionId);
}
