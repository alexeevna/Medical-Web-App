package com.app.medicalwebapp.services;

import com.app.medicalwebapp.model.Record;
import com.app.medicalwebapp.repositories.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordService {

    @Autowired
    RecordRepository recordRepository;

    public List<Record> getAllRecords() {
        return recordRepository.findAll();
    }

    public Record saveRecord(Record record) {
        return recordRepository.save(record);
    }
}
