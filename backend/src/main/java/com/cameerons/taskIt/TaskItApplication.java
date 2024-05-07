package com.cameerons.taskIt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TaskItApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskItApplication.class, args);
	}
}
