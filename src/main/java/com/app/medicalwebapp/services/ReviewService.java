package com.app.medicalwebapp.services;

import com.app.medicalwebapp.controllers.requestbody.ReviewRequest;
import com.app.medicalwebapp.controllers.requestbody.ReviewResponse;
import com.app.medicalwebapp.model.Review;
import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.repositories.ReviewRepository;
import com.app.medicalwebapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserRepository userRepository;

    public ReviewResponse getReviewsByTarget(long parent, long targetId) {
        User target = new User();
        target.setId(targetId);
        List<Review> reviews = reviewRepository.findByParentAndTarget(parent, target);
        return ReviewResponse.builder()
                .reviews(reviews)
                .build();
    }

    public void saveReview(ReviewRequest request, long creatorId) throws Exception  {
        User creator = new User();
        creator.setId(creatorId);
        User target = new User();
        target.setId(request.getTargetId());
        Review review = Review.builder()
                .content(request.getContent())
                .creationTime(LocalDateTime.now())
                .creator(creator)
                .target(target)
                .parent(request.getParent())
                .build();
        reviewRepository.save(review);
    }

}
