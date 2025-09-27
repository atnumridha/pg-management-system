package com.pgms.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "allocations")
public class Allocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long tenantId;

    @Column(nullable = false)
    private Long roomId;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "monthly_rent", nullable = false)
    private Double monthlyRent;

    @Column(name = "deposit")
    private Double deposit;

    @Column(name = "billing_day_of_month", nullable = false)
    private int billingDayOfMonth = 1;

    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE, ENDED, FUTURE

    @Column(name = "notes")
    private String notes;

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTenantId() { return tenantId; }
    public void setTenantId(Long tenantId) { this.tenantId = tenantId; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Double getMonthlyRent() { return monthlyRent; }
    public void setMonthlyRent(Double monthlyRent) { this.monthlyRent = monthlyRent; }

    public Double getDeposit() { return deposit; }
    public void setDeposit(Double deposit) { this.deposit = deposit; }

    public int getBillingDayOfMonth() { return billingDayOfMonth; }
    public void setBillingDayOfMonth(int billingDayOfMonth) { this.billingDayOfMonth = billingDayOfMonth; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
