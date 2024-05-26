package com.cameerons.taskIt.controller;
import com.cameerons.taskIt.dto.RefreshTokenDto;
import com.cameerons.taskIt.dto.UserDto;
import com.cameerons.taskIt.modals.RefreshToken;
import com.cameerons.taskIt.modals.User;
import com.cameerons.taskIt.service.AuthService;
import com.cameerons.taskIt.service.JwtService;
import com.cameerons.taskIt.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cameerons.taskIt.requests.LoginRequest;
import com.cameerons.taskIt.requests.RegisterRequest;
import com.cameerons.taskIt.response.LoginResponse;

import java.util.Arrays;
import java.util.HashMap;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;

    // create logger
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity
                .status(CREATED)
                .body(authService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletResponse response
            ) {
        try {
            LoginResponse loginResponse = authService.login(loginRequest, response);
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            if (e.getMessage().equals("Bad credentials")) {
                logger.error(e.getMessage());
                return ResponseEntity.status(UNAUTHORIZED).body("Invalid email or password");
            } else {
                return ResponseEntity.badRequest().build();
        }
    }}

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDto refreshTokenRequestDTO, HttpServletResponse response, HttpServletRequest request){
        try {
           var res = refreshTokenService.findByToken(refreshTokenRequestDTO.token())
                               .map(refreshTokenService::verifyExpiration)
                               .map(RefreshToken::getUser)
                               .map(userInfo -> {
                                   var claims = new HashMap<String, Object>();
                                   claims.put("fullName", userInfo.getFirstName());
                                   String accessToken = jwtService.generateToken(userInfo, claims);
                                   Cookie [] cookies = request.getCookies();
                                      Arrays.stream(cookies)
                                             .filter(cookie -> cookie.getName().equals("auth_token"))
                                             .forEach(cookie -> {
                                                  cookie.setValue("");
                                                  cookie.setMaxAge(0);
                                                  response.addCookie(cookie);
                                             });
                                      Cookie jwtCookie = new Cookie("auth_token", accessToken);
                                        jwtCookie.setMaxAge(60 * 60 * 24 * 7);
                                        jwtCookie.setPath("/");
                                        response.addCookie(jwtCookie);
                                   return LoginResponse.builder()
                                                       .token(accessToken)
                                                       .refreshToken(refreshTokenRequestDTO.token())
                                                       .build();
                               });

            return ResponseEntity.ok(res.get());
        } catch (Exception e) {
            return ResponseEntity.status(UNAUTHORIZED).body("Invalid refresh token");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response){

           return ResponseEntity
                .status(OK)
                .body(authService.logout(response));
    }


}
