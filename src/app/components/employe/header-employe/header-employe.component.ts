import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../../BaseUrl';

@Component({
  selector: 'app-header-employe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-employe.component.html',
  styleUrl: './header-employe.component.css'
})
export class HeaderEmployeComponent {

  errorMessage: string="";
  constructor(
    private baseUrl: BaseUrl, 
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService){}

  onLogoutEmploye(): void{
    localStorage.removeItem('local');
    // this.cookie.deleteAll('_local');

    this.errorMessage = 'logout';
    this.router.navigateByUrl('/login');
  }
  
}
