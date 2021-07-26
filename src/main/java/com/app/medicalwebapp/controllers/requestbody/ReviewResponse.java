package com.app.medicalwebapp.controllers.requestbody;

import com.app.medicalwebapp.model.Review;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReviewResponse {

    List<Review> reviews;

}
