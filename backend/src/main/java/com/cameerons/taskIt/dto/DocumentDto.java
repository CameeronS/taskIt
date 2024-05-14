package com.cameerons.taskIt.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record DocumentDto(String title, String content,
                          String icon, Integer id, Integer parentId,
                          Integer userId, Boolean isArchived, List<DocumentDto> children

) {

}
