package com.pgms.controller;

import com.pgms.model.Property;
import com.pgms.repository.PropertyRepository;
import com.pgms.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/properties")
@CrossOrigin(origins = "http://localhost:4200")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyRepository.save(property);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id " + id));
        return ResponseEntity.ok(property);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property propertyDetails) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id " + id));

        property.setName(propertyDetails.getName());
        property.setAddress(propertyDetails.getAddress());
        property.setCity(propertyDetails.getCity());
        property.setState(propertyDetails.getState());
        property.setPincode(propertyDetails.getPincode());
        property.setOwnerName(propertyDetails.getOwnerName());
        property.setContactNo(propertyDetails.getContactNo());
        property.setGstin(propertyDetails.getGstin());
        property.setActive(propertyDetails.getActive());

        Property updatedProperty = propertyRepository.save(property);
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id " + id));
        propertyRepository.delete(property);
        return ResponseEntity.ok().build();
    }
}
