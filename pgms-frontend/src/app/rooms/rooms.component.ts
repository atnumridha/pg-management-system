import { Component, OnInit } from '@angular/core';
import { RoomService, Room } from '../room.service';
import { PropertyService, Property } from '../property.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  loading = true;
  error = '';
  showAddForm = false;
  addModel: Room = {
    id: 0,
    propertyId: 0,
    number: '',
    type: '',
    capacity: '' as any,
    rentBase: '' as any,
    amenities: '',
    status: 'AVAILABLE'
  };
  editId?: number;
  editModel: Room = {
    id: 0,
    propertyId: 0,
    number: '',
    type: '',
    capacity: '' as any,
    rentBase: '' as any,
    amenities: '',
    status: 'AVAILABLE'
  };
  searchTerm: string = '';
  properties: Property[] = [];

  constructor(private roomService: RoomService, private propertyService: PropertyService) {}

  ngOnInit() {
    this.load();
    this.propertyService.getAll().subscribe({
      next: (props) => { this.properties = props; },
      error: err => { this.error = 'Could not load properties for dropdown'; }
    });
  }

  load() {
    this.loading = true;
    this.roomService.getAll().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.loading = false;
      },
      error: err => {
        this.error = 'Could not load rooms';
        this.loading = false;
      }
    });
  }

  addRoom() {
    this.roomService.add(this.addModel).subscribe({
      next: () => {
        this.showAddForm = false;
        this.addModel = {
          id: 0,
          propertyId: 0,
          number: '',
          type: '',
          capacity: 0,
          rentBase: 0,
          amenities: '',
          status: 'AVAILABLE'
        };
        this.load();
      },
      error: err => this.error = 'Failed to add room'
    });
  }

  deleteRoom(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.delete(id).subscribe({
        next: () => this.load(),
        error: err => this.error = 'Failed to delete room'
      });
    }
  }

  beginEdit(room: Room) {
    this.editId = room.id;
    this.editModel = { ...room };
  }

  saveEdit() {
    if (!this.editId) return;
    this.roomService.update(this.editId, this.editModel).subscribe({
      next: () => {
        this.editId = undefined;
        this.load();
      },
      error: err => this.error = 'Failed to update room'
    });
  }

  cancelEdit() {
    this.editId = undefined;
  }

  filteredRooms(): Room[] {
    if (!this.searchTerm.trim()) return this.rooms;
    const term = this.searchTerm.trim().toLowerCase();
    return this.rooms.filter(
      r =>
        (r.number && r.number.toLowerCase().includes(term)) ||
        (r.type && r.type.toLowerCase().includes(term)) ||
        (r.status && r.status.toLowerCase().includes(term)) ||
        (r.amenities && r.amenities.toLowerCase().includes(term))
    );
  }
}
