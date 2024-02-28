import { Routes } from '@angular/router';
import { HomeEmployeComponent } from './components/employe/home-employe/home-employe.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HomeManagerComponent } from './components/manager/home-manager/home-manager.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   
   { path: 'home', component: HomeComponent },
   { path: 'appointments', component: HomeComponent },
   { path: 'appointments/employes', component: HomeComponent},

   { path: 'employe/home', component: HomeEmployeComponent },
   { path: 'employe/appointments', component: HomeEmployeComponent },
   { path: 'employe/services', component: HomeEmployeComponent },
   { path: 'employe/preferences', component: HomeEmployeComponent },
   { path: 'employe/notifications', component: HomeEmployeComponent },
   
   { path: 'manager/home', component: HomeManagerComponent },
   { path: 'manager/appointments', component: HomeManagerComponent },
   { path: 'manager/services', component: HomeManagerComponent },
   { path: 'manager/preferences', component: HomeManagerComponent },
   { path: 'manager/notifications', component: HomeManagerComponent },
   { path: 'manager/users', component: HomeManagerComponent },
   { path: 'manager/offers', component: HomeManagerComponent },
   { path: 'manager/moneys', component: HomeManagerComponent },
   

   
   { path: 'services', component: HomeComponent },
   { path: 'preferences', component: HomeComponent },
   { path: 'notifications', component: HomeComponent },
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: '**', component: PageNotFoundComponent },
];
