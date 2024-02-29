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


  //DELETE SERVICE PREFERED BY CLIENT
  isSubmitDeleteServPref: boolean = false;
  isSubmitDeleteEmpPref: boolean = false;
  deletePreferenceService(){
    this.isSubmitDeleteServPref = true;
    this.isSubmitDeleteEmpPref = true;
  }

  service_id: string = "";
  deleteServicePrefered(id: string){
    this.service_id = id;
    this.deletePrefService();
    this.router.navigateByUrl('preferences');
    location.reload();
  }
  emp_id: string = "";
  deleteEmpPrefered(id: string){
    this.emp_id = id;
    this.deletePrefEmp();
    this.router.navigateByUrl('preferences');
    location.reload();
  }
  
  deletePrefService(srvprefere: string = this.service_id) {
    let local = localStorage.getItem('local')?.toString();
    const credentials = {userid: local, srvprefere: srvprefere}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/removeSrvPreference`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {

  })};

  deletePrefEmp(empprefere: string = this.emp_id) {
    let local = localStorage.getItem('local')?.toString();
    const credentials = {userid: local, empprefere: empprefere}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/removeEmpPreference`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {

  })};
      



  //ADD SERVICE PREFERED BY CLIENT
  isSubmitAddServPref: boolean = false;
  isSubmitAddEmpPref: boolean = false;
  addServicePreference(){
    this.isSubmitAddServPref = true;
    this.isSubmitAddEmpPref = true;
    this.getListServices();
    this.getListEmployes();
  }
  cancelAddServicePreference(){
    this.isSubmitAddServPref = this.isSubmitAddServPref;
    location.reload();
  }

  serviceId: string = "";
  services: any = [];
  onChangeServ(str: string){ this.serviceId = str; }
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

  addPrefService(srvprefere: string = this.serviceId) {
    let local = localStorage.getItem('local')?.toString();
    const credentials = {userid: local, srvprefere: srvprefere}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/addSrvPreference`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {

  })};

  /// ADD EMPLOYE PREFERENCE BY CLIENT MANOMBOKA ETO
  cancelAddEmployePreference(){
    this.isSubmitAddEmpPref = this.isSubmitAddEmpPref;
    location.reload();
  }

  employeId: string = "";
  employes: any = [];
  onChangeEmp(str: string){ this.employeId = str; }
  getListEmployes(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/users/employes`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.employes = data.users;
      // console.log(this.employes);
    })
  }

  addEmployePrefered(){
    this.addPrefEmploye();
    location.reload();
  }

  addPrefEmploye(empprefere: string = this.employeId) {
    let local = localStorage.getItem('local')?.toString();
    const credentials = {userid: local, empprefere: empprefere}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/addEmpPreference`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {

  })};

  ngOnInit(): void {
    this.getDetailUser();
    this.getAllUserWithPreference();
  }

}