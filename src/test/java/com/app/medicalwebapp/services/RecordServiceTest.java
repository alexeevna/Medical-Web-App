package com.app.medicalwebapp.services;

import com.app.medicalwebapp.model.FileObject;
import com.app.medicalwebapp.model.FileObjectFormat;
import com.app.medicalwebapp.model.Record;
import com.app.medicalwebapp.model.Topic;
import com.app.medicalwebapp.model.User;
import com.app.medicalwebapp.repositories.FileObjectRepository;
import com.app.medicalwebapp.repositories.RecordRepository;
import com.app.medicalwebapp.repositories.TopicRepository;
import com.app.medicalwebapp.repositories.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Set;


@SpringBootTest(properties = {"spring.datasource.driver-class-name=org.h2.Driver",
                                "spring.datasource.url=jdbc:h2:mem:db;DB_CLOSE_DELAY=-1",
                                "spring.datasource.username=sa",
                                "spring.datasource.password=sa"})
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class RecordServiceTest {

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TopicRepository topicRepository;

    @Autowired
    FileObjectRepository fileObjectRepository;

    @BeforeEach
    public void init() {
        fileObjectRepository.deleteAll();
        userRepository.deleteAll();
        recordRepository.deleteAll();
        topicRepository.deleteAll();
    }

    @Test
    public void testSaveAndLoad() {
        User user_saved = saveUser(user("Ivan Ivanov"));
        Topic topic_saved1 = saveTopic(topic(1L, "test topic 1"));
        Topic topic_saved2 = saveTopic(topic(1L, "test topic 2"));
        FileObject file_saved1 = saveFile(file(FileObjectFormat.DICOM));
        FileObject file_saved2 = saveFile(file(FileObjectFormat.PDF));

        Topic topic1 = new Topic();
        topic1.setId(topic_saved1.getId());
        Topic topic2 = new Topic();
        topic2.setId(topic_saved2.getId());
        FileObject file1 = new FileObject();
        file1.setId(file_saved1.getId());
        FileObject file2 = new FileObject();
        file2.setId(file_saved2.getId());
        User creator = new User();
        creator.setId(user_saved.getId());

        Record recordBeforeSave = record(Set.of(topic1, topic2), Set.of(file1, file2), creator, 5);
        recordRepository.save(recordBeforeSave);
        List<Record> allRecords = recordRepository.findAll();
        Assertions.assertEquals(1, allRecords.size());
        Record recordLoaded = allRecords.get(0);
        Assertions.assertEquals(2, recordLoaded.getAttachments().size());
        Assertions.assertEquals(2, recordLoaded.getTopics().size());
        Assertions.assertEquals(5, recordLoaded.getNumberOfReplies());
//        Assertions.assertEquals("Ivan Ivanov", recordLoaded.getCreator().getRealName());
    }

    private User saveUser(User user) {
        return userRepository.save(user);
    }

    private FileObject saveFile(FileObject fileObject) {
        return fileObjectRepository.save(fileObject);
    }

    private Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    private User user(String realName) {
        User newUser = new User();
//        newUser.setRealName(realName);
        return newUser;
    }

    private Topic topic(Long creatorId, String name) {
        Topic newTopic = new Topic();
        User creator = new User();
        creator.setId(creatorId);
        newTopic.setCreator(creator);
        newTopic.setName(name);
        return newTopic;
    }

    private FileObject file(FileObjectFormat format) {
        FileObject fileObject = new FileObject();
        fileObject.setFormat(format);
        return fileObject;
    }

    private Record record(Set<Topic> topics, Set<FileObject> attachments, User creator, Integer likes) {
        Record record = new Record();
        record.setAttachments(attachments);
        record.setCreator(creator);
        record.setTopics(topics);
        record.setNumberOfReplies(likes);
        return record;
    }
}
