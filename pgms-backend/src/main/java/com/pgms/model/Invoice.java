package com.pgms.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String invoiceNo;

    @Column(nullable = false)
    private Long tenantId;

    @Column(nullable = false)
    private Long allocationId;

    @Column(nullable = false)
    private int periodMonth; // 1-12

    @Column(nullable = false)
    private int periodYear;

    @Column(nullable = false)
    private LocalDate issueDate;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private Double subtotal;      // typically base rent
    private Double utilities;     // optional
    private Double taxes;         // optional, GST/inclusive
    private Double discount;
    @Column(nullable = false)
    private Double totalDue;

    @Column(nullable = false)
    private String status = "DUE"; // DUE, PAID, PARTIALLY_PAID, OVERDUE, VOID

    @Column
    private String pdfUrl; // for future downloadable PDF

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInvoiceNo() { return invoiceNo; }
    public void setInvoiceNo(String invoiceNo) { this.invoiceNo = invoiceNo; }

    public Long getTenantId() { return tenantId; }
    public void setTenantId(Long tenantId) { this.tenantId = tenantId; }

    public Long getAllocationId() { return allocationId; }
    public void setAllocationId(Long allocationId) { this.allocationId = allocationId; }

    public int getPeriodMonth() { return periodMonth; }
    public void setPeriodMonth(int periodMonth) { this.periodMonth = periodMonth; }

    public int getPeriodYear() { return periodYear; }
    public void setPeriodYear(int periodYear) { this.periodYear = periodYear; }

    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public Double getSubtotal() { return subtotal; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }

    public Double getUtilities() { return utilities; }
    public void setUtilities(Double utilities) { this.utilities = utilities; }

    public Double getTaxes() { return taxes; }
    public void setTaxes(Double taxes) { this.taxes = taxes; }

    public Double getDiscount() { return discount; }
    public void setDiscount(Double discount) { this.discount = discount; }

    public Double getTotalDue() { return totalDue; }
    public void setTotalDue(Double totalDue) { this.totalDue = totalDue; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPdfUrl() { return pdfUrl; }
    public void setPdfUrl(String pdfUrl) { this.pdfUrl = pdfUrl; }
}
