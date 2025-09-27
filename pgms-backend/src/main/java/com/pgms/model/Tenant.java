package com.pgms.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tenants")
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "kyc_type")
    private String kycType; // e.g., AADHAR, PASSPORT

    @Column(name = "kyc_id")
    private String kycId;

    @Column(name = "address")
    private String address;

    @Column(name = "emergency_contact")
    private String emergencyContact;

    @Column(name = "joined_at")
    private LocalDate joinedAt;

    @Column(name = "status")
    private String status; // ACTIVE, INACTIVE, VACATED, BLACKLISTED

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getKycType() { return kycType; }
    public void setKycType(String kycType) { this.kycType = kycType; }

    public String getKycId() { return kycId; }
    public void setKycId(String kycId) { this.kycId = kycId; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public LocalDate getJoinedAt() { return joinedAt; }
    public void setJoinedAt(LocalDate joinedAt) { this.joinedAt = joinedAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
