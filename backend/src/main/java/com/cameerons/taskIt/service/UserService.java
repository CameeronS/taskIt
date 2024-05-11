package com.cameerons.taskIt.service;

import com.cameerons.taskIt.dto.UserDto;
import com.cameerons.taskIt.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;


    public UserDto getAuthUser(String token) {
        String email = jwtService.extractUsername(token);
        var currentUser = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return UserDto.builder()
                .email(currentUser.getEmail())
                .firstName(currentUser.getFirstName())
                .lastName(currentUser.getLastName())
                .fullName(currentUser.getFullName())
                .build();
    }

}
