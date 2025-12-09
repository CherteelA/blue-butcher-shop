package com.myshop.commentsService.service;

import com.myshop.commentsService.repository.Comment;
import com.myshop.commentsService.repository.CommentsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class ExportService {

    private final CommentsRepository  commentsRepository;

    public ExportService(CommentsRepository commentsRepository) {
        this.commentsRepository = commentsRepository;
    }

    private String escapeCsvField(String field) {
        if (field == null) return "";
        return field.replace("\"", "\"\""); // Экранируем кавычку как ""
    }

    private String cleanNewlines(String text) {
        if (text == null) return "";
        return text.replace("\r", "").replace("\n", " ");
    }

    public byte[] exportProductsToCsv(UUID productId) {

        List<Comment> comments = commentsRepository.findAllByProductId(productId);

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            // Добавляем BOM для UTF-8 — чтобы Excel понял кодировку
            out.write(new byte[]{(byte) 0xEF, (byte) 0xBB, (byte) 0xBF});

            PrintWriter writer = new PrintWriter(new OutputStreamWriter(out, StandardCharsets.UTF_8));

            writer.println("id;comment;user_id;product_id;likes;username;created_at");

            for (Comment p : comments) {
                writer.printf(
                        "%s;%s;%s;%s;%s;%s;%s%n",
                        p.getId(),
                        cleanNewlines(escapeCsvField(p.getComment())),
                        p.getUserId(),
                        p.getProductId(),
                        p.getCountLikes(),
                        escapeCsvField(p.getUsername()),
                        p.getCreatedAt()
                );
            }

            writer.flush();
            return out.toByteArray();

        } catch (IOException e) {
            throw new RuntimeException("Failed to generate CSV", e);
        }
    }
}