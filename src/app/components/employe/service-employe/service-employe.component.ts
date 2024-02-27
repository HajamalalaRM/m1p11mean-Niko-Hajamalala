import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseUrl } from '../../../BaseUrl';

@Component({
  selector: 'app-service-employe',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink],
  templateUrl: './service-employe.component.html',
  styleUrl: './service-employe.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class ServiceEmployeComponent implements OnInit {

  servicesList: []=[];
  
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl){}

  getListServices(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/services/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.servicesList = data.services;
    })
  }
  
  ngOnInit(): void {
    this.getListServices();
  }
}
