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
    console.log('Login button clicked with username:', this.username, 'and password:', this.password);

    // Use the login method from UserService and subscribe to the result
    this.userService.login(this.username, this.password).subscribe(success => {
      if (success) {
        console.log('Login successful! Redirecting to home...');
        this.router.navigate(['/']);  // Navigate to home or another route after login
      } else {
        console.log('Login failed. Displaying error message.');
        this.errorMessage = 'Invalid username or password.';
      }
    }, error => {
      console.error('Error during login process:', error);
      this.errorMessage = 'An error occurred during login.';
    });
  }

  onClose() {
    // Logic to close or hide the login form
    this.router.navigate(['/']);
  }
}
