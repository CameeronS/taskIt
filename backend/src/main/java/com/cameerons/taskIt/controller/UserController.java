package com.cameerons.taskIt.controller;

import com.cameerons.taskIt.dto.UserDto;
import com.cameerons.taskIt.service.JwtService;
import com.cameerons.taskIt.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/me")
    public ResponseEntity<?> getAuthUser(
            @RequestHeader(name = "Authorization") String token
    ) {
try {

    String tokenValue = token.substring(7);
    UserDto user = userService.getAuthUser(tokenValue);

    return ResponseEntity.ok(user);
} catch (Exception e) {
    logger.error(e.getMessage());
    logger.error(e.getLocalizedMessage());
    logger.error(e.toString());
    return ResponseEntity.status(UNAUTHORIZED).body("Unauthorized");
}

    }
}
