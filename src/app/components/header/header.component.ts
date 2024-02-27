import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../BaseUrl';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent{

  errorMessage: string="";
  constructor(
    private baseUrl: BaseUrl, 
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService){}

  onLogoutClient(): void{
    localStorage.removeItem('local');
    // this.cookie.deleteAll('_local');

    this.errorMessage = 'logout';
    this.router.navigateByUrl('/login');
  }

}