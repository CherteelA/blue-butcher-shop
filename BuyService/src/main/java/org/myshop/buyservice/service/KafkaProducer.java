package org.myshop.buyservice.service;


import lombok.extern.slf4j.Slf4j;

import org.myshop.buyservice.DTO.ProductIdDTO;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;


import java.util.UUID;

@Slf4j
@Service
public class KafkaProducer {
    private final KafkaTemplate<String, ProductIdDTO> kafkaTemplateUpdate;

    public KafkaProducer(KafkaTemplate<String, ProductIdDTO> kafkaTemplateUpdate) {
        this.kafkaTemplateUpdate = kafkaTemplateUpdate;
    }

    public void sendUpdate(UUID id) {
        ProductIdDTO productIdDTO = new ProductIdDTO();
        productIdDTO.setId(id);
        kafkaTemplateUpdate.send("updateCountSold", productIdDTO);
    }

}
