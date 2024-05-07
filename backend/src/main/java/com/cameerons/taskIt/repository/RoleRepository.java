package com.cameerons.taskIt.repository;

import com.cameerons.taskIt.modals.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName (String name);
}
