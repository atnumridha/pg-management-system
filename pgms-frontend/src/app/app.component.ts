import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faGauge, faUsers, faBed, faBuilding, faFileInvoiceDollar, faMoneyBillWave, faCubes, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Paying Guest Management System';
  isLoggedInFlag: boolean = false;
  hamburgerMenuOpen: boolean = false;

  constructor(private router: Router, private faLibrary: FaIconLibrary) {
    // Register all needed solid icons
    faLibrary.addIcons(
      faBars,
      faGauge,
      faUsers,
      faBed,
      faBuilding,
      faFileInvoiceDollar,
      faMoneyBillWave,
      faCubes,
      faSignInAlt,
      faSignOutAlt
    );
  }

  ngOnInit(): void {
    this.checkLoginStatus();
    window.addEventListener('storage', () => this.checkLoginStatus());
  }

  toggleHamburgerMenu() {
    this.hamburgerMenuOpen = !this.hamburgerMenuOpen;
  }

  closeHamburgerMenu() {
    this.hamburgerMenuOpen = false;
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
