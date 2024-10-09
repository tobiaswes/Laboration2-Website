import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: { username: string } | null = null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  // Observable for the login state
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Backend login URL
  private loginUrl = 'http://localhost:8080/auth/login';

  // Login function using backend validation
  login(username: string, password: string): Observable<boolean> {
    console.log('Attempting to login with username:', username, 'and password:', password); // Log the input

    return this.http.post<{ message: string }>(this.loginUrl, { username, password })
      .pipe(
        map(response => {
          console.log('Login response from server:', response); // Log the server response

          if (response.message === 'Login successful') {
            console.log('Login successful! Storing user in sessionStorage');
            sessionStorage.setItem('user', username);
            this.isLoggedInSubject.next(true);
            return true;
          } else {
            console.log('Login failed: invalid credentials');
            return false;
          }
        }),
        catchError(error => {
          console.error('Error occurred during login:', error); // Log any errors from the HTTP call
          return of(false); // Return false in case of an error
        })
      );
  }

  signUp(username: string, password: string): Observable<boolean> {
    return this.http.post<{ message: string }>('http://localhost:8080/users/signup', { username, password })
      .pipe(
        map(response => response.message === 'Sign-up successful'),
        catchError(error => {
          console.error('Error during sign-up:', error);
          return of(false);
        })
      );
  }

  isLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    return user !== null;
  }

  getCurrentUser(): string | null {
    return sessionStorage.getItem('user');
  }

  logout(): void {
    console.log('Logging out, removing user from sessionStorage');
    sessionStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
  }
}
