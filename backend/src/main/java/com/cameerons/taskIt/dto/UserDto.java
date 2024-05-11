package com.cameerons.taskIt.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public record UserDto(String firstName, String lastName, String email, String fullName) {
}
