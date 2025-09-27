import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AllocationService, Allocation } from '../allocation.service';
import { TenantService } from '../tenant.service';
import { RoomService } from '../room.service';
import { Tenant } from '../tenant';
import { Room } from '../room.service';

@Component({
  selector: 'app-add-allocation',
  templateUrl: './add-allocation.component.html',
  styleUrls: ['./add-allocation.component.css']
})
export class AddAllocationComponent implements OnInit {
  public allocation: Allocation = {
    tenantId: 0,
    roomId: 0,
    startDate: '',
    endDate: '',
    monthlyRent: 0,
    deposit: 0,
    billingDayOfMonth: 1,
    status: 'ACTIVE',
    notes: ''
  };

  tenants: Tenant[] = [];
  rooms: Room[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddAllocationComponent>,
    private allocationService: AllocationService,
    private tenantService: TenantService,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.tenantService.getAll().subscribe({
      next: tenants => this.tenants = tenants,
      error: () => this.tenants = []
    });
    this.roomService.getAll().subscribe({
      next: rooms => this.rooms = rooms,
      error: () => this.rooms = []
    });
  }

  addAllocation() {
    this.allocationService.create(this.allocation).subscribe({
      next: () => {
        this.dialogRef.close('added');
      },
      error: (err: any) => {
        alert('Failed to add allocation');
      }
    });
  }

  cancelAllocation() {
    this.dialogRef.close();
  }
}
