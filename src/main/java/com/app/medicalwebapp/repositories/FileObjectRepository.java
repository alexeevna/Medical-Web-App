package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.FileObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileObjectRepository extends JpaRepository<FileObject, Long> {

}
