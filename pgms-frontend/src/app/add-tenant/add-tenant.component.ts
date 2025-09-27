import { Component } from '@angular/core';
import { TenantService } from '../tenant.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Tenant } from '../tenant';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css']
})
export class AddTenantComponent {
  tenant: Tenant = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    kycType: '',
    kycId: '',
    address: '',
    emergencyContact: '',
    joinedAt: '',
    status: 'ACTIVE'
  };

  public property = {
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    ownerName: '',
    contactNo: '',
    gstin: '',
    active: true
  };

  constructor(
    private tenantService: TenantService,
    public dialogRef: MatDialogRef<AddTenantComponent>
  ) {}

  addTenant() {
    this.tenantService.add(this.tenant).subscribe({
      next: () => {
        this.dialogRef.close('added');
      },
      error: error => {
        alert('Failed to add tenant');
      }
    });
  }

  onSubmit() {
    this.addTenant();
  }

  cancel() {
    this.dialogRef.close();
  }

  // Stub for property add (unused in dialog context)
  addProperty() {
    this.property = {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      ownerName: '',
      contactNo: '',
      gstin: '',
      active: true
    };
  }

  cancelProperty() {
    this.property = {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      ownerName: '',
      contactNo: '',
      gstin: '',
      active: true
    };
  }
}
