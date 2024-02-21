import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseUrl } from '../../BaseUrl';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class ServiceComponent implements OnInit {

  servicesList: []=[];
  
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl,
    private contentService: ContentComponent){}

  getListServices(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/services/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.servicesList = data.services;
      console.log(JSON.stringify(this.servicesList));
    })
  }
  
  ngOnInit(): void {
    this.getListServices();
    // this.contentService.getListServices()
  }
}
