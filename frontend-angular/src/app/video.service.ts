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

  getAllVideos(): Observable<Video[]>{
    return this.http.get<Video[]>(`${this.baseUrl}/`);
  }
  searchVideos(query: string): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/search?q=${query}`);
  }

  getVideosByUser(username: string | null): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/user/${username}`);
  }

  addVideo(video: {
    addedBy: string;
    link: string;
    description: string;
    title: string;
    category: string
  }): Observable<Video> {
    return this.http.post<Video>(`${this.baseUrl}/upload`, video);
  }

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

  deleteVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
