package com.cameerons.taskIt.controller;

import com.cameerons.taskIt.dto.WorkspaceDto;
import com.cameerons.taskIt.requests.JoinWorkSpaceRequest;
import com.cameerons.taskIt.response.WorkSpaceResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cameerons.taskIt.service.WorkspaceService;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/workspace")
@AllArgsConstructor
public class WorkSpaceController {

    private final WorkspaceService workspaceService;

    @PostMapping("/create")
    public ResponseEntity<WorkSpaceResponse>
    createWorkspace(@RequestBody WorkspaceDto workspaceDto,
                    @RequestHeader("Authorization") String token){
        return ResponseEntity
                .status(CREATED)
                .body(workspaceService.createWorkspace(workspaceDto, token));
    }

    @GetMapping("/get/{workspaceId}")
    public ResponseEntity<WorkspaceDto> getWorkspace(@PathVariable Integer workspaceId){
        return ResponseEntity.ok(workspaceService.getWorkspace(workspaceId));
    }

    @GetMapping ("/getAll")
    public ResponseEntity<?> getAllWorkspaces(@RequestBody Integer userId){
        return ResponseEntity.ok(workspaceService.getAllUserWorkspaces(userId));
    }

    @PostMapping("/join")
    public ResponseEntity<WorkSpaceResponse> joinWorkSpace(@RequestBody JoinWorkSpaceRequest joinWorkSpaceRequest){
        return ResponseEntity.ok(workspaceService.joinWorkSpace(joinWorkSpaceRequest));
    }

    @PostMapping("/leave")
    public ResponseEntity<WorkSpaceResponse> leaveWorkSpace(@RequestBody JoinWorkSpaceRequest joinWorkSpaceRequest){
        return ResponseEntity.ok(workspaceService.leaveWorkSpace(joinWorkSpaceRequest));
    }






}
