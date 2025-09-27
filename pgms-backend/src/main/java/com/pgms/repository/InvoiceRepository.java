package com.pgms.repository;

import com.pgms.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByTenantId(Long tenantId);
    List<Invoice> findByStatus(String status);
    List<Invoice> findByPeriodMonthAndPeriodYear(int periodMonth, int periodYear);
    List<Invoice> findByStatusAndPeriodMonthAndPeriodYear(String status, int periodMonth, int periodYear);
    Invoice findByInvoiceNo(String invoiceNo);
    boolean existsByInvoiceNo(String invoiceNo);
}
