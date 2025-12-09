package com.myshop.commentsService.repository;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    private UUID id;

    @NotNull(message = "Field comment mustn`t be null")
    private String comment;

    @NotNull(message = "Field userId mustn`t be null")
    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "product_id")
    @NotNull(message = "Field productId mustn`t be null")
    private UUID productId;

    @Column(name = "count_likes")
    private long countLikes = 0;

    private String username;
    
    public void like(){
        countLikes++;
    }

}
