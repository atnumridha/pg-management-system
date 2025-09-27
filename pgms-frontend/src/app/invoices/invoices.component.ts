import { Component, OnInit } from '@angular/core';
import { InvoiceService, Invoice } from '../invoice.service';

@Component({
  selector: 'app-invoices',
  template: `
  <div class="container my-4">
    <h2>Invoices</h2>
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

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
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
}
