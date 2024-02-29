import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

export class HeaderComponent implements OnInit {

  errorMessage: string="";
  constructor(
    private baseUrl: BaseUrl, 
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService){}
    
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onLogoutClient(): void{
    localStorage.removeItem('local');
    // this.cookie.deleteAll('_local');

    this.errorMessage = 'logout';
    this.router.navigateByUrl('/login');
  }

  // ROUTE FOR PAGE
  // this.route.url.subscribe(urlSegment => { 
  //   if(urlSegment[urlSegment.length - 1].path === 'appointments'){
  //     this.isRoute = urlSegment[urlSegment.length - 1].path;
  //   }
  //   if(urlSegment[urlSegment.length - 1].path === 'notifications'){
  //     this.isRoute = urlSegment[urlSegment.length - 1].path;
  //   }
  //   if(urlSegment[urlSegment.length - 1].path === 'services'){
  //     this.isRoute = urlSegment[urlSegment.length - 1].path;
  //   }
  //   if(urlSegment[urlSegment.length - 1].path === 'preferences'){
  //     this.isRoute = urlSegment[urlSegment.length - 1].path;
  //   }
  //   if(urlSegment[urlSegment.length - 1].path === 'home'){
  //     this.isRoute = urlSegment[urlSegment.length - 1].path;
  //   }
  // })

// }

}