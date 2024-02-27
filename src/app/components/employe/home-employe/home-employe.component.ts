import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUrl } from '../../../BaseUrl';
import { CookieService } from 'ngx-cookie-service';
import { NgFor } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { ContentEmployeComponent } from '../content-employe/content-employe.component';
import { HeaderEmployeComponent } from '../header-employe/header-employe.component';

@Component({
  selector: 'app-home-employe',
  standalone: true,
  imports: [ NgFor, HttpClientModule, FooterComponent, ContentEmployeComponent, HeaderEmployeComponent],
  templateUrl: './home-employe.component.html',
  styleUrl: './home-employe.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class HomeEmployeComponent implements OnInit{
  
  errorMessage: string="";
  users: any = [];

  constructor(
    private baseUrl: BaseUrl, 
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService){}

    actualiser(){
      location.reload();
    }

  ngOnInit(): void {

  }
}