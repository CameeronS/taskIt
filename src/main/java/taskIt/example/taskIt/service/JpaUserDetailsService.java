package taskIt.example.taskIt.service;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import taskIt.example.taskIt.modals.SecurityUser;
import taskIt.example.taskIt.repository.UserRepository;

@Service
public class JpaUserDetailsService implements UserDetailsService {

        private final UserRepository userRepository;

        public JpaUserDetailsService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                             .map(SecurityUser::new)
                             .orElseThrow();
    }
}
