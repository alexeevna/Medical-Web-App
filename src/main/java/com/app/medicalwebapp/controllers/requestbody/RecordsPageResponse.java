package com.app.medicalwebapp.controllers.requestbody;

import com.app.medicalwebapp.model.Record;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RecordsPageResponse {

    List<Record> records;

    Integer currentPage;

    Long totalElements;

    int totalPages;
}
