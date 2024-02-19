import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'home', component: HomeComponent },

   { path: 'appointments', component: HomeComponent },
   { path: 'appointments/employes', component: HomeComponent},
   { path: 'test/:idea', component: HomeComponent},
   
   { path: 'services', component: HomeComponent },
   { path: 'preferences', component: HomeComponent },
   { path: 'notifications', component: HomeComponent },
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: '**', component: PageNotFoundComponent },
];
