package taskIt.example.taskIt.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;
import taskIt.example.taskIt.dto.WorkspaceDto;
import taskIt.example.taskIt.modals.Workspace;
import taskIt.example.taskIt.repository.UserRepository;
import taskIt.example.taskIt.repository.WorkSpaceRepository;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class WorkspaceService {

   private final WorkSpaceRepository workSpaceRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

   public String createWorkspace(WorkspaceDto workspaceDto, String token){

       String jwt = token.substring(7);
       String userEmail = jwtService.extractUsername(jwt);

       var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));



       var workspace = Workspace.builder()
                                .name(workspaceDto.name())
                                .description(workspaceDto.description())
                                .createdAt(LocalDateTime.now())
                                .updatedAt(LocalDateTime.now())
                                .user(user)
                                .build();

       workSpaceRepository.save(workspace);
       return "Workspace created";
   }
}
