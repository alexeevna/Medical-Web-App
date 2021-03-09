package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.PipelineJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PipelineJobRepository extends JpaRepository<PipelineJob, Long> {

}
