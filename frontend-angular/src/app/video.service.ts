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

}
