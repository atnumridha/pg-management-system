import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Property {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  ownerName: string;
  contactNo: string;
  gstin: string;
  active: boolean;
}

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private baseUrl = `${environment.apiBase}/v1/properties`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl);
  }

  add(property: Property): Observable<Property> {
    return this.http.post<Property>(this.baseUrl, property);
  }

  update(id: number, property: Property): Observable<Property> {
    return this.http.put<Property>(`${this.baseUrl}/${id}`, property);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
