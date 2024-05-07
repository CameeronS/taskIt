package com.cameerons.taskIt.dto;

import lombok.Builder;

@Builder
public record WorkspaceDto(String name, String description){
}
