import { Injectable} from "@angular/core";
import {HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";


export interface Video {

  id: number;
  title: string;
  link: string;
  addedBy: string;
  category: string;
  description: string;

}

@Injectable({
  providedIn: 'root'
})

export class VideoService{

  private baseUrl = 'http://localhost:8080/video';

  constructor(private http:HttpClient) {}

  // get all videos from the server
  getAllVideos(): Observable<Video[]>{
    return this.http.get<Video[]>(`${this.baseUrl}/`);
  }

  // Search for videos based on a query string
  searchVideos(query: string): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/search?q=${query}`);
  }

  // Retrieve all videos added by a specific user
  getVideosByUser(username: string | null): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/user/${username}`);
  }

  // Add a new video by sending video details to the server
  addVideo(video: {
    addedBy: string;
    link: string;
    description: string;
    title: string;
    category: string
  }): Observable<Video> {
    return this.http.post<Video>(`${this.baseUrl}/upload`, video);
  }

  // Update an existing video's details
  updateVideo(video: {
    addedBy: string;
    link: string;
    description: string;
    id: null;
    title: string;
    category: string
  }): Observable<Video> {
    return this.http.put<Video>(`${this.baseUrl}/${video.id}`, video);
  }

  // Delete a video by its ID
  deleteVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
