import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../../BaseUrl';
import { ContentManagerComponent } from '../content-manager/content-manager.component';

@Component({
  selector: 'app-preference-manager',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, ContentManagerComponent ],
  templateUrl: './preference-manager.component.html',
  styleUrl: './preference-manager.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class PreferenceManagerComponent implements OnInit {

  users: any = [];
  usersList: any = [];
  preferred_services: any = [];
  // local: string = this.cookie.get('_local');
  isRole: string = "";

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl,
    private cookie: CookieService) {}

  getDetailUser() {
    let local = localStorage.getItem('local')?.toString();
    const credentials = {iduser: local}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/detailUser`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {
      this.users = data.employedetails;
  })};

  getAllUserWithPreference() {
    this.http.get(`${this.baseUrl.getBaseUrl()}/users/listAllUsers`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {
      this.usersList = data.usersdetails;
      // console.log(this.usersList);
  })};

  ngOnInit(): void {
    this.getDetailUser();
    this.getAllUserWithPreference();
  }

}
