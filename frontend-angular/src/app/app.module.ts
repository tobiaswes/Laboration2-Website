import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { VideoListComponent } from './videolist/videolist.component';
import {RouterModule, Routes} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [

];
@NgModule({
  declarations: [
    AppComponent,
    VideoListComponent,
    HeaderComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    UserProfileComponent,
    SearchbarComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    [provideHttpClient(withInterceptorsFromDi())]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
