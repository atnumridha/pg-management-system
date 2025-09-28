import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Allocation {
  id?: number;
  tenantId: number;
  roomId: number;
  startDate: string;
  endDate?: string;
  monthlyRent: number;
  deposit?: number;
  billingDayOfMonth: number;
  status: string;
  notes?: string;
}

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {
  private baseUrl = `${environment.apiBase}/v1/allocations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(this.baseUrl);
  }

  getByTenant(tenantId: number): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(`${this.baseUrl}/tenant/${tenantId}`);
  }

  getByRoom(roomId: number): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(`${this.baseUrl}/room/${roomId}`);
  }

  create(allocation: Allocation): Observable<Allocation> {
    return this.http.post<Allocation>(this.baseUrl, allocation);
  }

  endAllocation(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/end`, {});
  }

  update(id: number, allocation: Allocation): Observable<Allocation> {
    return this.http.put<Allocation>(`${this.baseUrl}/${id}`, allocation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
