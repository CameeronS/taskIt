package taskIt.example.taskIt;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.JdbcConnectionDetails;
import org.springframework.context.annotation.Bean;

import static org.yaml.snakeyaml.nodes.Tag.STR;

@SpringBootApplication
public class TaskItApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskItApplication.class, args);
	}


	@Bean
	CommandLineRunner commandLineRunner (JdbcConnectionDetails jdbc){
		return args -> {
			System.out.println("Connection Details: " + jdbc.getClass().getName());
			System.out.println("Connection Details: " + jdbc.getJdbcUrl());
			System.out.println("Connection Details: " + jdbc.getPassword());
			System.out.println("Connection Details: " + jdbc.getUsername());
		};
	}
}
