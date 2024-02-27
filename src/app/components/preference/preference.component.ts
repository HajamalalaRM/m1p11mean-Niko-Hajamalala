import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseUrl } from '../../BaseUrl';
import { ContentComponent } from '../content/content.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-preference',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, ContentComponent ],
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class PreferenceComponent implements OnInit {

  users: any = [];
  usersList: any = [];
  preferred_services: any = [];
  local: string = this.cookie.get('_local');
  isRole: string = "";

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl,
    private cookie: CookieService) {}

  getDetailUser(iduser: string = this.local) {
    const credentials = {iduser: iduser}
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


  //DELETE SERVICE PREFERED BY CLIENT
  isSubmitDeleteServPref: boolean = false;
  deletePreferenceService(){
    this.isSubmitDeleteServPref = true;
  }

  service_id: string = "";
  deleteServicePrefered(id: string){
    this.service_id = id;
    console.log(" SERVICE_ID "+ this.service_id);
    console.log(" LOCAL_ID "+ this.local);
    this.deletePrefService();
    this.router.navigateByUrl('preferences');
    location.reload();
  }
  
  deletePrefService(userid: string = this.local, srvprefere: string = this.service_id) {
    const credentials = {userid: userid, srvprefere: srvprefere}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/removeSrvPreference`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {

  })};
      



  //ADD SERVICE PREFERED BY CLIENT
  isSubmitAddServPref: boolean = false;
  addServicePreference(){
    this.isSubmitAddServPref = true;
    this.getListServices();
  }
  cancelAddServicePreference(){
    this.isSubmitAddServPref = this.isSubmitAddServPref;
    location.reload();
  }

  serviceId: string = "";
  services: any = [];
  onChangeEmp(str: string){ this.serviceId = str; console.log(this.serviceId) }
  getListServices(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/services/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.services = data.services;
    })
  }

  addServicePrefered(){
    this.addPrefService();
    location.reload();
  }

  addPrefService(userid: string = this.local, srvprefere: string = this.serviceId) {
    const credentials = {userid: userid, srvprefere: srvprefere}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/addSrvPreference`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {

  })};

  /// DELETE EMPLOYE PREFERENCE BY CLIENT MANOMBOKA ETO

  ngOnInit(): void {
    this.getDetailUser();
    this.getAllUserWithPreference();
  }

}