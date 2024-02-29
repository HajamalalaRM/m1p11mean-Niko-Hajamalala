import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUrl } from '../../../BaseUrl';
import { FooterComponent } from '../../footer/footer.component';
import { CookieService } from 'ngx-cookie-service';
import { HeaderManagerComponent } from '../header-manager/header-manager.component';
import { ContentManagerComponent } from '../content-manager/content-manager.component';
import { StatManagerComponent } from '../stat-manager/stat-manager.component';

@Component({
  selector: 'app-home-manager',
  standalone: true,
  imports: [ NgFor, HttpClientModule, StatManagerComponent, FooterComponent, HeaderManagerComponent, ContentManagerComponent],
  templateUrl: './home-manager.component.html',
  styleUrl: './home-manager.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class HomeManagerComponent  implements OnInit{
  
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