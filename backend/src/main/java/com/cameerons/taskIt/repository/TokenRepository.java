package com.cameerons.taskIt.repository;

import com.cameerons.taskIt.modals.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer>{

    Optional<Token> findByToken(String token);
}
