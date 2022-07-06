package com.app.medicalwebapp.controllers.requestbody;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.ToString;


@Getter
@ToString
public class TopicRequest {

    @NotNull
    String topicName;

}
