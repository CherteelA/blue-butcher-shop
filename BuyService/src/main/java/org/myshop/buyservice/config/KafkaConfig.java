package org.myshop.buyservice.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;

@Slf4j
@Configuration
@EnableKafka
public class KafkaConfig {

    @Bean
    public NewTopic newTopicUpdate(){
        log.info("updateCountSold topic created");
        return new NewTopic("updateCountSold", 1, (short)1);
    }
}