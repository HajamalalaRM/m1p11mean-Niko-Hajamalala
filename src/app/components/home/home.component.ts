import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUrl } from '../../BaseUrl';
import { ContentComponent } from '../content/content.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';
import { NotificationComponent } from '../notification/notification.component';
import { CookieService } from 'ngx-cookie-service';
import { PreferenceComponent } from '../preference/preference.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PreferenceComponent, NgFor, HttpClientModule, HeaderComponent, ContentComponent, NotificationComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class HomeComponent implements OnInit{
  
  errorMessage: string="";
  users: any = [];

  constructor(
    private loginService: LoginComponent, 
    private baseUrl: BaseUrl, 
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService){}

    actualiser(){
      location.reload();
    }

  ngOnInit(): void {
    if(localStorage.getItem('local')){

    } else {
      this.router.navigateByUrl('/login');
    }
  }
}