package com.cameerons.taskIt.controller;

import com.cameerons.taskIt.dto.UserDto;
import com.cameerons.taskIt.service.JwtService;
import com.cameerons.taskIt.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getAuthUser(
            @RequestHeader(name = "Authorization") String token
    ) {

        String tokenValue = token.substring(7);
        UserDto user = userService.getAuthUser(tokenValue);
        if(jwtService.isTokenExpired(tokenValue)){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(user);

    }
}
