import { Component, OnInit } from '@angular/core';
import { AllocationService, Allocation } from '../allocation.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAllocationComponent } from '../add-allocation/add-allocation.component';

@Component({
  selector: 'app-allocations',
  template: `
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Allocations (Tenant-Room Assignments)</h2>
      <button class="btn btn-primary" (click)="openAddAllocation()">Add Allocation</button>
    </div>
    <hr>
    <div *ngIf="loading" class="my-4 text-center"><div class="spinner-border"></div> Loading...</div>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <table class="table table-bordered" *ngIf="allocations.length > 0">
      <thead class="table-dark">
        <tr>
          <th>Tenant</th>
          <th>Room</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Monthly Rent</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let alloc of allocations">
          <td>{{ alloc.tenantId }}</td>
          <td>{{ alloc.roomId }}</td>
          <td>{{ alloc.startDate }}</td>
          <td>{{ alloc.endDate || '-' }}</td>
          <td>₹{{ alloc.monthlyRent }}</td>
          <td>
            <span [class]="alloc.status === 'ACTIVE' ? 'badge bg-success' : alloc.status === 'ENDED' ? 'badge bg-danger' : 'badge bg-secondary'">
              {{ alloc.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div *ngIf="allocations.length === 0 && !loading && !error">
      <div class="alert alert-info mt-3">No allocations found.</div>
    </div>
  </div>
  `,
  styleUrls: []
})
export class AllocationsComponent implements OnInit {
  allocations: Allocation[] = [];
  loading = true;
  error = '';

  constructor(private allocationService: AllocationService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadAllocations();
  }

  loadAllocations() {
    this.loading = true;
    this.allocationService.getAll().subscribe({
      next: allocs => {
        this.allocations = allocs;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not load allocations';
        this.loading = false;
      }
    });
  }

  openAddAllocation() {
    const dialogRef = this.dialog.open(AddAllocationComponent, { width: '520px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added') {
        this.loadAllocations();
      }
    });
  }
}
