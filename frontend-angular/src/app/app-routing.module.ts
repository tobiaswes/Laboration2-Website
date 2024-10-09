import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent} from "./user-profile/user-profile.component";
import { NavbarComponent} from "./navbar/navbar.component";
import { VideoListComponent } from './videolist/videolist.component'; // Adjust the path if needed
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
  { path: '', component: NavbarComponent  }, // Default route for home
  { path: 'videos/category/:category', component: VideoListComponent }, // Route for filtering videos by category
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'userProfile', component: UserProfileComponent },
  { path: '**', redirectTo: '' }, // Redirect any unknown paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
