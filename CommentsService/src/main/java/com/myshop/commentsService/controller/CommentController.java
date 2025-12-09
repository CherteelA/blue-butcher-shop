package com.myshop.commentsService.controller;


import com.myshop.commentsService.repository.Comment;
import com.myshop.commentsService.service.CommentService;
import com.myshop.commentsService.service.ExportService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = {"http://26.94.50.207:4200", "http://localhost:4200", "http://localhost:80", "http://localhost", "http://185.161.64.35"})
public class CommentController {

    private final CommentService commentService;
    private final ExportService exportService;

    public CommentController(CommentService commentService, ExportService exportService) {
        this.commentService = commentService;
        this.exportService = exportService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(path = "new_comment")
    public Comment save(@RequestBody @Valid Comment comment) {
        return commentService.save(comment);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(path = "comments/{id}")
    public ResponseEntity<Comment> delete(@PathVariable UUID id) {
        return commentService.deleteComment(id);
    }

    @GetMapping(path = "comments")
    public List<Comment> getComment(@RequestParam UUID id) {
        return commentService.getComments(id);
    }

    @PutMapping
    public ResponseEntity<String> setLike(@RequestBody UUID id) {
        return commentService.setLike(id);
    }

    @GetMapping("/export/csv")
    public ResponseEntity<byte[]> exportProductsCsv(@RequestParam UUID id) {
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("text/csv"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=products.csv")
                .body(exportService.exportProductsToCsv(id));
    }

}
