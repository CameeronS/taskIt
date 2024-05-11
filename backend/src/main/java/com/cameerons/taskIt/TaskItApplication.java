package com.cameerons.taskIt;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.JdbcConnectionDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TaskItApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskItApplication.class, args);
	}

	//Debug jdbc connection to database
	@Bean
	CommandLineRunner commandLineRunner(
			JdbcConnectionDetails jdbcConnectionDetails
	) {
		return args -> {
			System.out.println(jdbcConnectionDetails.getJdbcUrl());
			System.out.println(jdbcConnectionDetails.getUsername());
			System.out.println(jdbcConnectionDetails.getPassword());

		};
	}


}
