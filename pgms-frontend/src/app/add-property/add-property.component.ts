import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {
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
    public dialogRef: MatDialogRef<AddPropertyComponent>,
    private propertyService: PropertyService
  ) { }

  addProperty() {
    this.propertyService.add(this.property).subscribe({
      next: () => {
        this.dialogRef.close('added');
        // Optionally reset model here if dialog re-uses component.
      },
      error: err => {
        alert('Failed to add property');
      }
    });
  }

  cancelProperty() {
    this.dialogRef.close();
  }
}
