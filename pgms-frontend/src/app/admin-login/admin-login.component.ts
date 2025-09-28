import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.loading = true;
    this.errorMessage = '';
    this.http
      .post<any>(`${environment.apiBase}/v1/admin/login`, {
        adminName: this.username,
        adminPassword: this.password,
      })
      .subscribe(
        (res) => {
          this.loading = false;
          // On success, set auth flag and redirect
          localStorage.setItem('isAdmin', 'true');
          this.router.navigate(['/home']).then(() => window.location.reload());
        },
        (err) => {
          this.loading = false;
          localStorage.removeItem('isAdmin');
          if (err.status === 401) {
            this.errorMessage = 'Invalid username or password';
          } else {
            this.errorMessage = 'Login failed. Try again.';
          }
        }
      );
  }

  logout() {
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/login']);
  }
}
