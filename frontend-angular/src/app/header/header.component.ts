// header.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string = '';
  isLoggedIn: boolean = false; // Initialize to false
  @Output() searchVideos: EventEmitter<string> = new EventEmitter<string>(); // Create an EventEmitter

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to the login state observable
    this.userService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      console.log('User logged in:', this.isLoggedIn); // Debugging log
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  navigateToLogin(): void {
    if (this.isLoggedIn) {
      this.userService.logout(); // Log the user out
      this.isLoggedIn = false; // Update the login status
    } else {
      this.router.navigate(['/login']); // Navigate to the login page
    }
  }
  get username(): string | null {
    return this.userService.getCurrentUser(); // Getter to retrieve the username
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchVideos.emit(this.searchTerm);
    }
  }
}
