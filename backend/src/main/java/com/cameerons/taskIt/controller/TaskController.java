package com.cameerons.taskIt.controller;

import com.cameerons.taskIt.dto.TaskDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cameerons.taskIt.service.TaskService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody TaskDto taskDto, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(taskService.createTask(taskDto, token));
    }



}
