import { NgFor, NgIf, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { __values } from 'tslib';
import { BaseUrl } from '../../BaseUrl';
import { NotificationComponent } from '../notification/notification.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ServiceComponent } from '../service/service.component';
// import localFr from '@angular/common/locales/fr';
// registerLocaleData(localFr, 'fr');

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, NotificationComponent, ServiceComponent, PreferenceComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class ContentComponent implements OnInit {

  isRoute: string = '';
  urlList: string = '';
  errorMessage: string = "";
  isSubmit: boolean = false;
  
  employes: [] = [];
  services: [] = [];
  appointments: [] = [];
  checkedValues: string[]=[];

  userEmpId: string = "";
  servicesId: string = "";
  datetime: string = "";
  description: string = "";

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl){}
  

  // APPOINTMENTS

  // LIST OF EMPLOYES
  getListEmployes(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/users/employes`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.employes = data.users;
      console.log(JSON.stringify(this.employes));
    })
  }

  // LIST OF SERVICES
  getListServices(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/services/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.services = data.services;
      console.log(JSON.stringify(this.services));
    })
  }

  getListOfAppointments(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/appointments`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.appointments = data.services;
      console.log(JSON.stringify(this.appointments));
    })
  }

  getEmployNotBusy(){
    this.getListEmployes();
    this.getListServices();
  }

  onChangeEmp(str: string){ this.userEmpId = str }
  onChangeDescription(description: string){ this.description = description; }
  onChangeService(event: any, serviceId: any){
    if(event.target.checked){
      this.checkedValues.push(serviceId);
    } else {
      const index = this.checkedValues.indexOf(serviceId);
      if(index !== -1){
        this.checkedValues.splice(index, 1);
        console.log(this.checkedValues.splice(index, 1))
      }
    }
  }

  add_appointment(){
    let userClientId = localStorage.getItem('local')?.toString();  
    let status = "in progress";
    // let description = "Birthday party";

    console.log("DATE_TIME : "+this.datetime);
    console.log("DESCRIPTION : "+this.description);
    console.log("SERVICE_ID : "+this.checkedValues);
    console.log("CLIENT_ID : "+userClientId);
    console.log("STATUS : "+status);

    const credentials = {servicesId:this.checkedValues, userClientId:userClientId, userEmpId:this.userEmpId, datetime:this.datetime, status:status, description:this.description}
      this.http.post(`${this.baseUrl.getBaseUrl()}/appointments/add`, credentials, {
      // this.http.post(`${this.baseUrl.getBaseUrl()}/appointments/add`, credentials, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data: any) => {

      })
    this.router.navigateByUrl('/appointments');
  }

  ngOnInit(): void {

    this.getListOfAppointments();

    // console.log(this.route.snapshot.queryParams['date']);
    // console.log(this.route.snapshot.queryParams['time']);
    // console.log(this.route.snapshot.routeConfig?.path);
    // console.log(this.route.snapshot.params['idea']);

    this.route.url.subscribe(urlSegment => {
      
      if(urlSegment[urlSegment.length - 1].path === 'appointments'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='appointments/employes'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
      if(urlSegment[urlSegment.length - 1].path === 'notifications'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
      if(urlSegment[urlSegment.length - 1].path === 'services'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
      if(urlSegment[urlSegment.length - 1].path === 'preferences'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
      if(urlSegment[urlSegment.length - 1].path === 'home'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
    })
  }
}
