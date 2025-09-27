package com.pgms.dto;

public class MetricsSummaryDto {
    private long totalProperties;
    private long totalRooms;
    private long totalTenants;
    private long activeTenants;
    private long vacantRooms;
    private double totalInvoiced;
    private double totalReceived;
    private long dueInvoices;
    private long overdueInvoices;

    public long getTotalProperties() { return totalProperties; }
    public void setTotalProperties(long totalProperties) { this.totalProperties = totalProperties; }

    public long getTotalRooms() { return totalRooms; }
    public void setTotalRooms(long totalRooms) { this.totalRooms = totalRooms; }

    public long getTotalTenants() { return totalTenants; }
    public void setTotalTenants(long totalTenants) { this.totalTenants = totalTenants; }

    public long getActiveTenants() { return activeTenants; }
    public void setActiveTenants(long activeTenants) { this.activeTenants = activeTenants; }

    public long getVacantRooms() { return vacantRooms; }
    public void setVacantRooms(long vacantRooms) { this.vacantRooms = vacantRooms; }

    public double getTotalInvoiced() { return totalInvoiced; }
    public void setTotalInvoiced(double totalInvoiced) { this.totalInvoiced = totalInvoiced; }

    public double getTotalReceived() { return totalReceived; }
    public void setTotalReceived(double totalReceived) { this.totalReceived = totalReceived; }

    public long getDueInvoices() { return dueInvoices; }
    public void setDueInvoices(long dueInvoices) { this.dueInvoices = dueInvoices; }

    public long getOverdueInvoices() { return overdueInvoices; }
    public void setOverdueInvoices(long overdueInvoices) { this.overdueInvoices = overdueInvoices; }
}
