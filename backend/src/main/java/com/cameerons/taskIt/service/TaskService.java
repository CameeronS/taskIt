package com.cameerons.taskIt.service;

import com.cameerons.taskIt.dto.TaskDto;
import com.cameerons.taskIt.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.cameerons.taskIt.modals.Tasks;
import com.cameerons.taskIt.repository.TaskRepository;
import com.cameerons.taskIt.repository.WorkSpaceRepository;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final WorkSpaceRepository workspaceRepository;


    public String createTask (TaskDto taskDto, String token){

        // Extract the user email from the token
        String jwt = token.substring(7);
        String userEmail = jwtService.extractUsername(jwt);

        // Find the user by email
        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));

        var workspace = workspaceRepository.findById(taskDto.workspaceId()).orElseThrow(() -> new IllegalStateException("Workspace not found"));

        if (workspace == null){
            throw new IllegalStateException("Workspace not found");
        }

        // Create a new task
        var task = Tasks.builder()
                        .name(taskDto.name())
                        .description(taskDto.description())
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .workspace(workspace)
                        .user(user)
                        .build();
        taskRepository.save(task);

        return "Task created";
    }


}
