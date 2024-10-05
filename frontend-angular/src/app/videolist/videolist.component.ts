import { Component, OnInit } from '@angular/core';
import { Video } from '../video.service'; // Adjust the import path based on your file structure
import { VideoService } from "../video.service";
import { Router, ActivatedRoute } from "@angular/router"; // Import ActivatedRoute

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.scss']
})
export class VideoListComponent implements OnInit {
  videos: Video[] = [];
  filteredVideos: Video[] = [];
  categories: string[] = [];

  constructor(private videoService: VideoService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getVideos(); // Fetch videos first
  }

  getVideos(): void {
    this.videoService.getAllVideos().subscribe({
      next: (data: Video[]) => {
        this.videos = data;
        this.filteredVideos = data; // Initially show all videos
        console.log('Videos fetched:', this.videos); // Log videos to check if they are being fetched
        this.extractCategories(); // Call this if you need to display categories in the nav

        // After fetching the videos, check for category filtering
        this.route.params.subscribe(params => {
          const category = params['category'];
          console.log('Category from route:', category); // Log the category to check if it's being captured
          if (category) {
            console.log('Category from route:', category);
            this.filterVideos(category);
          } else {
            this.filteredVideos = this.videos; // Show all videos if no category is provided
          }
        });
      },
      error: (error) => console.error('Error fetching videos:', error)
    });
  }

  filterVideos(category: string): void {
    console.log('Filtering videos by category:', category); // Log the category being filtered
    this.filteredVideos = this.videos.filter(video => video.category.toLowerCase() === category.toLowerCase());
    console.log('Filtered videos:', this.filteredVideos); // Log filtered videos to ensure the filtering works
  }

  extractCategories(): void {
    const uniqueCategories = new Set(this.videos.map((video) => video.category));
    this.categories = Array.from(uniqueCategories);
  }

}
