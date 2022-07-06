package com.app.medicalwebapp.repositories;

import com.app.medicalwebapp.model.Review;
import com.app.medicalwebapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByParent(Long parent);

    List<Review> findByParentAndTargetOrderByCreationTimeDesc(Long parent, User target);

}
