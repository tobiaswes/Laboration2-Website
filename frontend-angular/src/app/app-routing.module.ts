import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent} from "./navbar/navbar.component";
import { VideoListComponent } from './videolist/videolist.component'; // Adjust the path if needed
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: '', component: NavbarComponent  }, // Default route for home
  { path: 'videos/category/:category', component: VideoListComponent }, // Route for filtering videos by category
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' } // Redirect any unknown paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
