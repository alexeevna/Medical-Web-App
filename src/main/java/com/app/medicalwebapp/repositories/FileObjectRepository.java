package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.FileObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Repository
public interface FileObjectRepository extends JpaRepository<FileObject, Long> {

    public List<FileObject> findByOwner(Long userId);

}
