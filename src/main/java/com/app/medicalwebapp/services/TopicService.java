package com.app.medicalwebapp.services;

import com.app.medicalwebapp.controllers.requestbody.TopicRequest;
import com.app.medicalwebapp.model.Topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.medicalwebapp.repositories.TopicRepository;
import com.app.medicalwebapp.model.User;

import java.time.LocalDateTime;


@Service
public class TopicService {

    @Autowired
    TopicRepository topicRepository;

    public void createNewTopic(TopicRequest request, Long creatorId) throws Exception {
        User creator = new User();
        creator.setId(creatorId);
        Topic topic = Topic.builder()
                .name(request.getTopicName())
                .creationTime(LocalDateTime.now())
                .creator(creator)
                .build();
        topicRepository.save(topic);
    }
}
