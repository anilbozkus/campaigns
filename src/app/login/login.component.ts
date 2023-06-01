import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;
  showError: boolean = false;

  constructor(private router: Router) {
    if (localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    // Check if username and password are correct
    if (this.username === 'anilbozkus' && this.password === '123456') {
      // Store user info in local storage
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
    } else {
      // Show error message
      this.showError = true;
    }
  }
}
