package com.cameerons.taskIt.service;

import com.cameerons.taskIt.dto.WorkspaceDto;
import com.cameerons.taskIt.exception.EntityNotFound;
import com.cameerons.taskIt.modals.Workspace;
import com.cameerons.taskIt.repository.UserRepository;
import com.cameerons.taskIt.repository.WorkSpaceRepository;
import com.cameerons.taskIt.requests.JoinWorkSpaceRequest;
import com.cameerons.taskIt.response.WorkSpaceResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class WorkspaceService {

   private final WorkSpaceRepository workSpaceRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

   public WorkSpaceResponse createWorkspace(WorkspaceDto workspaceDto, String token){

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
       return new WorkSpaceResponse("Workspace created", workspace.getName());
   }


   public WorkspaceDto getWorkspace(Integer workspaceId) {
       var workspace = workSpaceRepository.findById(workspaceId)
                                          .orElseThrow(() -> new EntityNotFound("Workspace not found"));
       if (workspace == null){
              throw new EntityNotFound("Workspace not found");
       }
       return new WorkspaceDto(workspace.getName(), workspace.getDescription());
   }


    public WorkSpaceResponse joinWorkSpace (JoinWorkSpaceRequest joinWorkSpaceRequest) {
        var workspace = workSpaceRepository.findById(joinWorkSpaceRequest.getWorkspaceId()).orElseThrow(()
                -> new EntityNotFound("Workspace not found"));

        var user = userRepository.findById(joinWorkSpaceRequest.getUserId()).orElseThrow(()
                -> new EntityNotFound("User not found"));

        workspace.getWorkspaceUsers().add(user);
        workSpaceRepository.save(workspace);
        return new WorkSpaceResponse("User joined workspace", workspace.getName());

    }

    public WorkSpaceResponse leaveWorkSpace (JoinWorkSpaceRequest joinWorkSpaceRequest) {
        var workspace = workSpaceRepository.findById(joinWorkSpaceRequest.getWorkspaceId()).orElseThrow(()
                -> new EntityNotFound("Workspace not found"));

        var user = userRepository.findById(joinWorkSpaceRequest.getUserId()).orElseThrow(()
                -> new EntityNotFound("User not found"));

        workspace.getWorkspaceUsers().remove(user);
        workSpaceRepository.save(workspace);
        return new WorkSpaceResponse("User left workspace", workspace.getName());
    }

    public List<Workspace> getAllUserWorkspaces(Integer userId) {
        return workSpaceRepository.findAllByUserId(userId);
    }

}

