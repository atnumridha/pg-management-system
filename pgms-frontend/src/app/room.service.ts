import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Room {
  id: number;
  propertyId: number;
  number: string;
  type: string;
  capacity: number;
  rentBase: number;
  amenities: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'http://localhost:8080/api/v1/rooms';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl);
  }

  getByStatus(status: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}?status=${status}`);
  }

  add(room: Room): Observable<Room> {
    return this.http.post<Room>(this.baseUrl, room);
  }

  update(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/${id}`, room);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
