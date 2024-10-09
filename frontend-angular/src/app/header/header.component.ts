// header.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {Video, VideoService} from "../video.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string = '';
  isLoggedIn: boolean = false; // Initialize to false
  filteredVideos: Video[] = [];
  videos: Video[] = [];

  @Output() searchEvent = new EventEmitter<string>();
  constructor(private router: Router, private userService: UserService, private videoService: VideoService) {}

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
  navigateToSignUp(): void {
    this.router.navigate(['/signup']);  // Replace '/signup' with your sign-up route
  }

  navigateToLogin(): void {
    if (this.isLoggedIn) {
      this.userService.logout(); // Log the user out
      this.isLoggedIn = false;
      this.router.navigate(['/']);// Update the login status
    } else {
      this.router.navigate(['/login']); // Navigate to the login page
    }
  }
  get username(): string | null {
    return this.userService.getCurrentUser(); // Getter to retrieve the username
  }

  userProfile(): void{
    this.router.navigate(['/userProfile']);
  }

  handleSearch(query: string): void {
    this.searchEvent.emit(query);
    if (query) {
      this.videoService.searchVideos(query).subscribe((results) => {
        console.log('Search results:', results);
        this.filteredVideos = results; // Update the displayed videos based on search results
      });
    } else {
      this.filteredVideos = this.videos; // Reset to all videos when search query is empty
      console.log('Reset to all videos:', this.filteredVideos);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleSearch(this.searchTerm); // Use handleSearch to emit the query
    }
  }

}
