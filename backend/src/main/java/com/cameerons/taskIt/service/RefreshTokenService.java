package com.cameerons.taskIt.service;

import com.cameerons.taskIt.modals.RefreshToken;
import com.cameerons.taskIt.modals.User;
import com.cameerons.taskIt.repository.RefreshTokenRepository;
import com.cameerons.taskIt.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final static long REFRESH_TOKEN_EXPIRATION_TIME = 604800000;

    public RefreshToken createRefreshToken(String email){

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Optional<RefreshToken> existingToken = refreshTokenRepository.findByUserId(user.getId());

        if(existingToken.isPresent()){
            return existingToken.get();
        } else {
            RefreshToken refreshToken = RefreshToken.builder()
                                                    .user(userRepository.findByEmail(email).get())
                                                    .token(UUID.randomUUID().toString())
                                                    // set time to 1 minute for testing
                                                    .expiresAt(Instant.now().plusMillis(REFRESH_TOKEN_EXPIRATION_TIME))
                                                    .build();
            return refreshTokenRepository.save(refreshToken);
        }
    }


    public Optional<RefreshToken> findByToken(String token){
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token){
        if(token.getExpiresAt().compareTo(Instant.now())<0){
            refreshTokenRepository.delete(token);
            throw new RuntimeException(token.getToken() + " Refresh token is expired. Please make a new login..!");
        }
        return token;
    }
}
