package com.app.medicalwebapp.services;

import com.app.medicalwebapp.controllers.requestbody.RecordsPageResponse;
import com.app.medicalwebapp.model.Record;
import com.app.medicalwebapp.model.Topic;
import com.app.medicalwebapp.repositories.RecordRepository;
import com.app.medicalwebapp.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class RecordService {

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    TopicRepository topicRepository;

    public RecordsPageResponse getRecordsPage(Integer pageNumber, Integer sizeOfPage, String partOfTitle) {
        Pageable pageable = PageRequest.of(pageNumber, sizeOfPage);

        Page<Record> recordsPage = partOfTitle != null
                ? recordRepository.findByTitleContaining(partOfTitle, pageable)
                : recordRepository.findAll(pageable);

        return getRecordsResponse(recordsPage, pageNumber);
    }

    public RecordsPageResponse getRecordsPageByTopic(Integer pageNumber, Integer sizeOfPage, Long topicId) {
        Pageable pageable = PageRequest.of(pageNumber, sizeOfPage);
        Topic topic = new Topic();
        topic.setId(topicId);
        Page<Record> recordsPage = recordRepository.findByTopics(topic, pageable);

        return getRecordsResponse(recordsPage, pageNumber);
    }

    private RecordsPageResponse getRecordsResponse(Page recordsPage, int pageNumber) {
        return RecordsPageResponse.builder()
                .records(recordsPage.getContent())
                .currentPage(pageNumber)
                .totalElements(recordsPage.getTotalElements())
                .totalPages(recordsPage.getTotalPages())
                .build();
    }

}
