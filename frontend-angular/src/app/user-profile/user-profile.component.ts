import { Component, OnInit } from '@angular/core';
import { VideoService, Video } from '../video.service'; // Import VideoService and Video interface
import { UserService } from '../user.service'; // Assuming you have a UserService for managing the logged-in user

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userVideos: Video[] = []; // Store videos added by the user
  newVideo: { addedBy: string; link: string; description: string; id: number | null; title: string; category: string } = {
    id: null, title: '', link: '', description: '', category: '', addedBy: ''
  }; // New video form
  isEditing: boolean = false; // To track if a video is being edited

  constructor(private videoService: VideoService, private userService: UserService) {}

  ngOnInit(): void {
    this.getUserVideos(); // Fetch the user's videos on initialization
  }

  getUserVideos(): void {
    const username = this.userService.getCurrentUser(); // Assuming `getCurrentUser` returns the logged-in user's username
    this.videoService.getVideosByUser(username).subscribe({
      next: (data: Video[]) => {
        this.userVideos = data;
        console.log('User videos:', this.userVideos);
      },
      error: (error) => console.error('Error fetching user videos:', error)
    });
  }

  addVideo(): void {
    const username = this.userService.getCurrentUser(); // Get current user's username
    if (typeof username === "string") {
      this.newVideo.addedBy = username;
    } // Set the addedBy field

    this.videoService.addVideo(this.newVideo).subscribe({
      next: (addedVideo) => {
        this.userVideos.push(addedVideo); // Add the new video to the user's list
        this.newVideo = { id: null, title: '', link: '', description: '', category: '', addedBy: '' }; // Reset the form
      },
      error: (error) => console.error('Error adding video:', error)
    });
  }

  updateVideo(): void {

  }
  editVideo(video: Video): void {
    this.isEditing = true;
    this.newVideo = { ...video }; // Populate the form with video details for editing
  }



  deleteVideo(video: Video): void {
    this.videoService.deleteVideo(video.id).subscribe({
      next: () => {
        this.userVideos = this.userVideos.filter(v => v.id !== video.id); // Remove the video from the list
      },
      error: (error) => console.error('Error deleting video:', error)
    });
  }
}
