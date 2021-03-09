package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.Pipeline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PipelineRepository extends JpaRepository<Pipeline, Long> {

}
