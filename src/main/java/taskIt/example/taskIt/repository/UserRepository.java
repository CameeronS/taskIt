package taskIt.example.taskIt.repository;

import org.springframework.data.repository.CrudRepository;
import taskIt.example.taskIt.modals.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
