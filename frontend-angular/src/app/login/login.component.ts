import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';  // Import the UserService to handle login logic

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  onLoginSubmit(): void {
    // Use the login method from UserService
    if (this.userService.login(this.username, this.password)) {
      // Successful login
      this.router.navigate(['/']); // Navigate to home or other route after login
    } else {
      // Show an error message on failed login
      this.errorMessage = 'Invalid username or password.';
    }
  }

  onClose() {
    // Logic to close or hide the login form
    this.router.navigate(['/']);
  }
}
