package com.myshop.commentsService.service;


import com.myshop.commentsService.DTO.CommentIdDTO;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;


import java.util.UUID;

@Slf4j
@Service
public class KafkaProducer {
    private final KafkaTemplate<String, CommentIdDTO> kafkaTemplateUpdate;

    public KafkaProducer(KafkaTemplate<String, CommentIdDTO> kafkaTemplateUpdate) {
        this.kafkaTemplateUpdate = kafkaTemplateUpdate;
    }

    public void sendUpdate(UUID id) {
        log.info("send to topic `updateCountComments` productForSearch: {}", id);
        CommentIdDTO commentIdDTO = new CommentIdDTO();
        commentIdDTO.setId(id);
        kafkaTemplateUpdate.send("updateCountComments", commentIdDTO);
    }
}
