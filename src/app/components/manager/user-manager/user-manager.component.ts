import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseUrl } from '../../../BaseUrl';
import { ContentManagerComponent } from '../content-manager/content-manager.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, ContentManagerComponent ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class UserManagerComponent implements OnInit{

  usersList: any = [];
  usersListEmp: any = [];

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl,
    private cookie: CookieService) {}
    
  getAllUserWithPreference() {
    this.http.get(`${this.baseUrl.getBaseUrl()}/users/listAllClients`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {
      this.usersList = data.usersdetails;
  })};

  getAllUserEmploye() {
    this.http.get(`${this.baseUrl.getBaseUrl()}/users/listAllEmps`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {
      this.usersListEmp = data.usersdetails;
  })};

  ngOnInit(): void {
    this.getAllUserWithPreference();
    this.getAllUserEmploye();
  }
}
