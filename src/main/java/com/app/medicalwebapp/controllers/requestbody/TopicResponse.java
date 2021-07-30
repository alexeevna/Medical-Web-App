package com.app.medicalwebapp.controllers.requestbody;

import com.app.medicalwebapp.model.Topic;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TopicResponse {

    List<Topic> topics;

}
