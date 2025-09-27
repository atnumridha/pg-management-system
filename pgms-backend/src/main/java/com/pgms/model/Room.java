package com.pgms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "property_id")
    private Long propertyId;

    @Column(name = "number")
    private String number;

    @Column(name = "type")
    private String type; // e.g., SINGLE, DOUBLE, DORM

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "rent_base")
    private Double rentBase;

    @Column(name = "amenities")
    private String amenities; // comma-separated for MVP

    @Column(name = "status")
    private String status; // e.g., AVAILABLE, OCCUPIED, MAINTENANCE

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPropertyId() { return propertyId; }
    public void setPropertyId(Long propertyId) { this.propertyId = propertyId; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Double getRentBase() { return rentBase; }
    public void setRentBase(Double rentBase) { this.rentBase = rentBase; }

    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
