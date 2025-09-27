package com.pgms.controller;

import com.pgms.model.Tenant;
import com.pgms.repository.TenantRepository;
import com.pgms.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tenants")
@CrossOrigin(origins = "http://localhost:4200")
public class TenantController {

    @Autowired
    private TenantRepository tenantRepository;

    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    @PostMapping
    public Tenant createTenant(@RequestBody Tenant tenant) {
        return tenantRepository.save(tenant);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tenant> getTenantById(@PathVariable Long id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id " + id));
        return ResponseEntity.ok(tenant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tenant> updateTenant(@PathVariable Long id, @RequestBody Tenant tenantDetails) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id " + id));

        tenant.setFirstName(tenantDetails.getFirstName());
        tenant.setLastName(tenantDetails.getLastName());
        tenant.setPhone(tenantDetails.getPhone());
        tenant.setEmail(tenantDetails.getEmail());
        tenant.setKycType(tenantDetails.getKycType());
        tenant.setKycId(tenantDetails.getKycId());
        tenant.setAddress(tenantDetails.getAddress());
        tenant.setEmergencyContact(tenantDetails.getEmergencyContact());
        tenant.setJoinedAt(tenantDetails.getJoinedAt());
        tenant.setStatus(tenantDetails.getStatus());

        Tenant updatedTenant = tenantRepository.save(tenant);
        return ResponseEntity.ok(updatedTenant);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTenant(@PathVariable Long id) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id " + id));
        tenantRepository.delete(tenant);
        return ResponseEntity.ok().build();
    }
}
