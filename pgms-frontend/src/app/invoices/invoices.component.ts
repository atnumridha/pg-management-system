import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService, Invoice } from '../invoice.service';
import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';

@Component({
  selector: 'app-invoices',
  template: `
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Invoices</h2>
      <button class="btn btn-primary" (click)="openAddInvoice()">Add Invoice</button>
    </div>
    <hr>
    <div *ngIf="loading" class="my-4 text-center"><div class="spinner-border"></div> Loading...</div>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <table class="table table-bordered" *ngIf="invoices.length > 0">
      <thead class="table-dark">
        <tr>
          <th>Invoice No</th>
          <th>Tenant</th>
          <th>Month</th>
          <th>Due Date</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let inv of invoices">
          <td>{{ inv.invoiceNo }}</td>
          <td>{{ inv.tenantId }}</td>
          <td>{{ inv.periodYear }}-{{ inv.periodMonth | number: '2.0' }}</td>
          <td>{{ inv.dueDate }}</td>
          <td>₹{{ inv.totalDue | number:'1.2-2' }}</td>
          <td>
            <span [class]="inv.status === 'PAID' ? 'badge bg-success' :
              inv.status === 'OVERDUE' ? 'badge bg-danger' :
              inv.status === 'PARTIALLY_PAID' ? 'badge bg-warning' : 'badge bg-secondary'">
              {{ inv.status }}
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-secondary me-2" (click)="openEditInvoice(inv)">Edit</button>
            <button class="btn btn-sm btn-danger" (click)="deleteInvoice(inv)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div *ngIf="invoices.length === 0 && !loading && !error">
      <div class="alert alert-info mt-3">No invoices found.</div>
    </div>
  </div>
  `,
  styleUrls: []
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  loading = true;
  error = '';

  constructor(private invoiceService: InvoiceService, private dialog: MatDialog) {}

  deleteInvoice(inv: Invoice) {
    if (!inv.id) return;
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(inv.id).subscribe({
        next: () => this.loadInvoices(),
        error: err => this.error = 'Failed to delete invoice'
      });
    }
  }

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.loading = true;
    this.invoiceService.getAll().subscribe({
      next: (invs) => {
        this.invoices = invs;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not load invoices';
        this.loading = false;
      }
    });
  }

  openAddInvoice() {
    const dialogRef = this.dialog.open(AddInvoiceComponent, { width: '650px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added' || result === 'updated') {
        this.loadInvoices();
      }
    });
  }

  openEditInvoice(invoice: Invoice) {
    const dialogRef = this.dialog.open(AddInvoiceComponent, {
      width: '650px',
      data: { invoice, edit: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadInvoices();
      }
    });
  }
}
