package com.cameerons.taskIt.controller;

import com.cameerons.taskIt.dto.CreateDocumentDto;
import com.cameerons.taskIt.dto.DocumentDto;
import com.cameerons.taskIt.modals.Document;
import com.cameerons.taskIt.service.DocumentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@AllArgsConstructor
@RequestMapping("/api/document")
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/create")
    public ResponseEntity<?> createDocument(@RequestBody CreateDocumentDto document, @RequestHeader("Authorization") String token ){
        return ResponseEntity.status(CREATED).body(documentService.createDocument(document, token));
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllUserDocuments(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(documentService.getAllUserDocuments(token, false));
    }

    @GetMapping("/get/archived")
    public ResponseEntity<?> getAllUserArchivedDocuments(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(documentService.getAllArchivedDocuments(token));
    }

    @GetMapping("/get/{documentId}")
    public ResponseEntity<?> getDocument(@PathVariable Integer documentId, @RequestHeader("Authorization") String token){
        try {
            return ResponseEntity.ok(documentService.getDocumentById(documentId, token));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{documentId}")
    public ResponseEntity<?> updateDocument(@PathVariable Integer documentId, @RequestBody CreateDocumentDto document, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(documentService.updateDocument(documentId, document, token));
    }

    @PutMapping("/archive/{documentId}")
    public ResponseEntity<?> archiveDocument(@PathVariable Integer documentId, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(documentService.archiveDocument(documentId, token));
    }

    @PutMapping("/restore/{documentId}")
    public ResponseEntity<?> restoreDocument(@PathVariable Integer documentId, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(documentService.restoreDocument(documentId, token));
    }

    @DeleteMapping("/delete/{documentId}")
    public ResponseEntity<?> deleteDocument(@PathVariable Integer documentId, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(documentService.permanentDeleteDocument(documentId, token));
    }







}
