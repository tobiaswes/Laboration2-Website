import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  // Handle the sign-up form submission
  onSignUpSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.userService.signUp(this.username, this.password).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/']);  // Redirect to login on successful sign-up
          } else {
            this.errorMessage = 'Sign-up failed. Please try again.';
          }
        },
        error => {
          console.error('Sign-up error:', error);
          this.errorMessage = 'An error occurred during sign-up.';
        }
    );
  }

  onClose(): void {
    this.router.navigate(['/']);
  }

}
