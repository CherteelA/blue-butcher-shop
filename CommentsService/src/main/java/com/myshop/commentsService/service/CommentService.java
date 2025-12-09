package com.myshop.commentsService.service;

import com.myshop.commentsService.repository.Comment;
import com.myshop.commentsService.repository.CommentsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class CommentService {

    private final CommentsRepository commentsRepository;
    private final KafkaProducer kafkaProducer;

    public CommentService(CommentsRepository commentsRepository, KafkaProducer kafkaProducer) {
        this.commentsRepository = commentsRepository;
        this.kafkaProducer = kafkaProducer;
    }


    public Comment save(Comment comment) {
        comment.setId(UUID.randomUUID());
        comment.setCreatedAt(LocalDate.now());
        kafkaProducer.sendUpdate(comment.getProductId());
        log.info("comment save success.");
        return commentsRepository.save(comment);
    }

    public ResponseEntity<Comment> deleteComment(UUID id){
        if(id == null){
            return ResponseEntity.badRequest().build();
        }
        Optional<Comment> comment = commentsRepository.findById(id);
        if(comment.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        kafkaProducer.sendUpdate(comment.get().getProductId());
        commentsRepository.deleteById(id);
        return ResponseEntity.ok().body(comment.get());
    }

    public List<Comment> getComments(UUID id) {
        if (id == null) {
            return List.of();
        }
        return commentsRepository.findAllByProductId(id);
    }

    public ResponseEntity<String> setLike(UUID id){
        Comment comment = commentsRepository.findById(id).orElse(null);

        if(comment == null){
            return ResponseEntity.badRequest().body("Comment not found");
        }

        comment.like();
        commentsRepository.save(comment);
        return ResponseEntity.ok().build();
    }

}
