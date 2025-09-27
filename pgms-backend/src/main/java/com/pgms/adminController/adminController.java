package com.pgms.adminController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import com.pgms.adminModel.adminModel;
import com.pgms.adminRepository.adminRepository;


@RestController
@RequestMapping("/api/v1/")
public class adminController {
	
	
	@Autowired
	private adminRepository repo;

	
	//get all 
	
	@GetMapping("/admin")
	public List<adminModel> getAllAdmins() {
		return repo.findAll();
	}

	// Login endpoint
	@PostMapping("/admin/login")
	public ResponseEntity<?> login(@RequestBody adminModel credentials) {
		adminModel found = repo.findAll().stream()
				.filter(a -> a.getAdminName().equals(credentials.getAdminName()) && a.getAdminPassword().equals(credentials.getAdminPassword()))
				.findFirst()
				.orElse(null);
		if (found != null) {
			return ResponseEntity.ok("{\"message\": \"Login successful\"}");
		} else {
			return ResponseEntity.status(401).body("{\"message\": \"Invalid username or password\"}");
		}
	}
}
