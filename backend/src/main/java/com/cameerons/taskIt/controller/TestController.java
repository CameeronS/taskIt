package com.cameerons.taskIt.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/test")
public class TestController {

        @GetMapping("/helloworld")
        public String test(){
            return "Hello World";
        }
}
