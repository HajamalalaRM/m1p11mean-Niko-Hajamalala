import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../../BaseUrl';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header-manager',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './header-manager.component.html',
  styleUrl: './header-manager.component.css'
})
export class HeaderManagerComponent  {

  errorMessage: string="";
  constructor(
    private baseUrl: BaseUrl, 
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService){}

  onLogoutManager(): void{
    localStorage.removeItem('local');
    // this.cookie.deleteAll('_local');

    this.errorMessage = 'logout';
    this.router.navigateByUrl('/login');
  }
  
}
