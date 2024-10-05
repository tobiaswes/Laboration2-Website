// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService, Video } from './video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend-ang-app';
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  categories: string[] = [];

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.getVideos();
  }

  goHome(): void {
    this.router.navigate(['/']); // Navigate to the home component
  }

  isLoginVisible: boolean = false;

  toggleLoginForm() {
    this.isLoginVisible = !this.isLoginVisible; // Toggle login form visibility
  }

  getVideos(): void {
    this.videoService.getAllVideos().subscribe({
      next: (data: Video[]) => {
        this.videos = data;
        this.filteredVideos = data;
        this.extractCategories();
      },
      error: (error) => console.error('Error fetching videos:', error)
    });
  }

  extractCategories(): void {
    const uniqueCategories = new Set(this.videos.map((video) => video.category));
    this.categories = Array.from(uniqueCategories);
  }

  filterVideos(category: string): void {
    this.filteredVideos = this.videos.filter((video) => video.category === category);
  }
  handleSearch(searchTerm: string): void {
    if (searchTerm) {
      this.videoService.searchVideos(searchTerm).subscribe({
        next: (data: Video[]) => {
          this.filteredVideos = data; // Update filtered videos with search results
        },
        error: (error) => console.error('Error searching videos:', error)
      });
    } else {
      this.filteredVideos = this.videos; // Show all videos if no search term
    }
  }

}
