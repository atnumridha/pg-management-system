import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tenant } from './tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private baseUrl = 'http://localhost:8080/api/v1/tenants';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(this.baseUrl);
  }

  add(tenant: Tenant): Observable<Tenant> {
    return this.http.post<Tenant>(this.baseUrl, tenant);
  }

  update(id: number, tenant: Tenant): Observable<Tenant> {
    return this.http.put<Tenant>(`${this.baseUrl}/${id}`, tenant);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

export { Tenant } from './tenant';
