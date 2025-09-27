package com.pgms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.pgms.adminRepository.adminRepository;
import com.pgms.adminModel.adminModel;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200")
public class PgmsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PgmsBackendApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins("http://localhost:4200")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowCredentials(true);
			}
		};
	}
	
	@Bean
	public CommandLineRunner seedAdmin(adminRepository adminRepo) {
		return args -> {
			if (adminRepo.count() == 0) {
				adminModel admin = new adminModel("admin", "admin123");
				adminRepo.save(admin);
				System.out.println("Seeded default admin: admin/admin123");
			}
		};
	}
}
