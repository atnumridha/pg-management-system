import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Paying Guest Management System';
  isLoggedInFlag: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    window.addEventListener('storage', () => this.checkLoginStatus());
  }

  checkLoginStatus() {
    this.isLoggedInFlag = localStorage.getItem('isAdmin') === 'true';
  }

  logout() {
    localStorage.removeItem('isAdmin');
    this.checkLoginStatus();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}
