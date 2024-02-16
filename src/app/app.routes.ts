import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'home', component: HomeComponent },

   { path: 'meetings', component: HomeComponent },
   { path: 'meetings/:date/:time', component: HomeComponent },
   
   { path: 'services', component: HomeComponent },
   { path: 'preferences', component: HomeComponent },
   { path: 'notifications', component: HomeComponent },
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: '**', component: PageNotFoundComponent },
];
