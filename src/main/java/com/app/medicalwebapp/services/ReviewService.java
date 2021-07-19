package com.app.medicalwebapp.services;

import com.app.medicalwebapp.controllers.requestbody.ReviewRequest;
import com.app.medicalwebapp.model.Review;
import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    public void saveReview (ReviewRequest request, Long creatorId) throws Exception  {
        User creator = new User();
        creator.setId(creatorId);
        Review review = Review.builder()
                .content(request.getContent())
                .creationTime(LocalDateTime.now())
                .creator(creator)
                //.edited(false)
                .parent(request.getParentId())
                .build();
        reviewRepository.save(review);
    }

}
