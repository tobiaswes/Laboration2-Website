import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: { username: string } | null = null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // Initial value from sessionStorage

  // Observable for the login state
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // Simulate login by setting the username and password
  login(username: string, password: string): boolean {
    const validCredentials = {
      username: 'test',
      password: '123'
    };

    // Check if the provided username and password match the valid credentials
    if (username === validCredentials.username && password === validCredentials.password) {
      // Store the username in sessionStorage
      sessionStorage.setItem('user', username);
      this.isLoggedInSubject.next(true);
      return true; // Login successful
    }
    return false; // Login failed
  }

  isLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    console.log('User in session storage:', user); // Log the username
    return user !== null; // Return true if the user is logged in
  }

  getCurrentUser(): string | null {
    return sessionStorage.getItem('user'); // Retrieve the current user from sessionStorage
  }

  // Log out the user
  logout(): void {
    sessionStorage.removeItem('user'); // Clear the user from sessionStorage
    this.isLoggedInSubject.next(false);
  }
}
