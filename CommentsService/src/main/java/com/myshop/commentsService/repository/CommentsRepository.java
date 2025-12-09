package com.myshop.commentsService.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CommentsRepository extends JpaRepository<Comment, UUID> {

    @Query(value = "SELECT * FROM comments WHERE product_id=:id", nativeQuery = true)
    List<Comment> findAllByProductId(UUID id);
}
