package com.cameerons.taskIt.dto;

public record CreateDocumentDto(String title, String content, String icon, Integer parentId) {
}
