package com.app.medicalwebapp.controllers;

import com.app.medicalwebapp.controllers.requestbody.ReviewRequest;
import com.app.medicalwebapp.controllers.requestbody.ReviewResponse;
import com.app.medicalwebapp.model.Review;
import com.app.medicalwebapp.repositories.ReviewRepository;
import com.app.medicalwebapp.security.UserDetailsImpl;
import com.app.medicalwebapp.services.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 604800)
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    Logger log = LoggerFactory.getLogger(ReviewController.class);

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReviewService reviewService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllReviews() {
        try {
            List<Review> reviews = reviewRepository.findByParent(-1L)/*.orElse(null)*/;;
            ReviewResponse responseBody = ReviewResponse.builder()
                    .reviews(reviews)
                    .build();
            return ResponseEntity.ok().body(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveReview(@Valid @RequestBody ReviewRequest request)  {
        try {
            reviewService.saveReview(request, getAuthenticatedUserId(), request.getParent());
            System.out.println(request.getParent());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok().build();
    }

    private Long getAuthenticatedUserId() {
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal != null ? principal.getId() : null;
    }

}
