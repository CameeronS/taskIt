package com.cameerons.taskIt.repository;

import com.cameerons.taskIt.modals.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
    List<Document> findByUserId (Integer userId);
}
