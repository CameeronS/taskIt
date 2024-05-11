package com.cameerons.taskIt.dto;

import lombok.Builder;

@Builder
public record RefreshTokenDto(String token) {
}
