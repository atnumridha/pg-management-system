import { Component, OnInit } from '@angular/core';
import { PropertyService, Property } from '../property.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { faPlus, faEdit, faTrash, faBars, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faBars = faBars;
  faSave = faSave;
  faTimes = faTimes;

  properties: Property[] = [];
  loading = true;
  error = '';
  showAddForm = false;
  editId?: number;
  editModel: Property = { name: '', address: '', city: '', state: '', pincode: '', ownerName: '', contactNo: '', gstin: '', active: true };
  addModel: Property = { name: '', address: '', city: '', state: '', pincode: '', ownerName: '', contactNo: '', gstin: '', active: true };
  searchTerm: string = '';

  constructor(private propertyService: PropertyService, private dialog: MatDialog) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.propertyService.getAll().subscribe({
      next: (props) => {
        this.properties = props;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not load properties';
        this.loading = false;
      }
    });
  }

  openAddPropertyDialog(): void {
    this.dialog.open(AddPropertyComponent, {
      width: '600px',
      disableClose: false,
      autoFocus: true
    }).afterClosed().subscribe(result => {
      if (result === 'added') {
        this.load();
      }
    });
  }

  addProperty() {
    this.propertyService.add(this.addModel).subscribe({
      next: () => {
        this.showAddForm = false;
        this.addModel = { name: '', address: '', city: '', state: '', pincode: '', ownerName: '', contactNo: '', gstin: '', active: true };
        this.load();
      },
      error: err => this.error = 'Failed to add property'
    });
  }

  deleteProperty(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.delete(id).subscribe({
        next: () => this.load(),
        error: err => this.error = 'Failed to delete property'
      });
    }
  }

  beginEdit(prop: Property) {
    this.editId = prop.id;
    this.editModel = { ...prop };
  }

  saveEdit() {
    if (!this.editId) return;
    this.propertyService.update(this.editId, this.editModel).subscribe({
      next: () => {
        this.editId = undefined;
        this.load();
      },
      error: err => this.error = 'Failed to update property'
    });
  }

  cancelEdit() {
    this.editId = undefined;
  }

  filteredProperties(): Property[] {
    if (!this.searchTerm.trim()) return this.properties;
    const term = this.searchTerm.trim().toLowerCase();
    return this.properties.filter(
      p =>
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.city && p.city.toLowerCase().includes(term)) ||
        (p.address && p.address.toLowerCase().includes(term)) ||
        (p.ownerName && p.ownerName.toLowerCase().includes(term)) ||
        (p.state && p.state.toLowerCase().includes(term)) ||
        (p.pincode && p.pincode.includes(term)) ||
        (p.gstin && p.gstin.toLowerCase().includes(term))
    );
  }
}
