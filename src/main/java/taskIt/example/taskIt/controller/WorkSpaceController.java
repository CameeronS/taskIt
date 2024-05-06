package taskIt.example.taskIt.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import taskIt.example.taskIt.dto.WorkspaceDto;
import taskIt.example.taskIt.service.WorkspaceService;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/workspace")
@AllArgsConstructor
public class WorkSpaceController {

    private final WorkspaceService workspaceService;

    @RequestMapping("/create")
    public ResponseEntity<?> createWorkspace(@RequestBody WorkspaceDto workspaceDto, @RequestHeader("Authorization") String token){
        return ResponseEntity
                .status(CREATED)
                .body(workspaceService.createWorkspace(workspaceDto, token));
    }





}
