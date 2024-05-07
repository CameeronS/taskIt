package com.cameerons.taskIt.repository;

import org.springframework.data.repository.CrudRepository;
import com.cameerons.taskIt.modals.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
