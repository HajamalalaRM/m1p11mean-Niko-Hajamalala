import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../../BaseUrl';
import { HeaderManagerComponent } from '../header-manager/header-manager.component';
import { NotificationManagerComponent } from '../notification-manager/notification-manager.component';
import { PreferenceManagerComponent } from '../preference-manager/preference-manager.component';
import { ServiceManagerComponent } from '../service-manager/service-manager.component';
import { UserManagerComponent } from '../user-manager/user-manager.component';

@Component({
  selector: 'app-content-manager',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, ServiceManagerComponent, NotificationManagerComponent, PreferenceManagerComponent, HeaderManagerComponent, UserManagerComponent],
  templateUrl: './content-manager.component.html',
  styleUrl: './content-manager.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class ContentManagerComponent implements OnInit {

  isRoute: string = '';
  errorMessage: string = "";
  isSubmit: boolean = false;
  
  user: any = [];
  employes: any = [];
  services: any = [];
  appointments: any = [];
  appointmentsForManager: any = [];
  checkedValues: string[]=[];

  userEmpId: string = "";
  servicesId: string = "";
  datetime: string = "";
  description: string = "";

  local: string = this.cookie.get('_local');
  currentDate!: Date;
  dateNow!: string;
  empAppointment: any;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl,
    private cookie: CookieService){}


  // LIST OF SERVICES
  getListServices(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/services/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.services = data.services;
      // console.log(JSON.stringify(this.services));
    })
  }

  getListOfAppointments(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/appointments`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.appointments = data.services;
      // console.log(this.appointments);
    })
  }
  
  // get liste apppointments by id user
  getListOfAppointmentsManager(userID: string = this.local) {
    const credentials = {iduser: userID}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/adminAppointment`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.appointmentsForManager = data.userappointments;
      console.log(this.appointmentsForManager);
    })};


  getDetailUser(iduser: string = this.local) {
    const credentials = {iduser: iduser}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/detailUser`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {
      this.user = data.employedetails;
      console.log(this.user);
    })};

  ngOnInit(): void {

    this.getDetailUser();
    this.getListOfAppointmentsManager();

// DATE NOW
    setInterval(() => {
      const currentDate = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
      this.dateNow = currentDate.toLocaleDateString('en-US', options);

      // Ajouter l'heure sans le décalage horaire GMT
      const hours = ('0' + currentDate.getHours()).slice(-2);
      const minutes = ('0' + currentDate.getMinutes()).slice(-2);
      const seconds = ('0' + currentDate.getSeconds()).slice(-2);
      this.dateNow += '  ' + hours + ':' + minutes + ':' + seconds;
    }, 1000);

// ROUTE FOR PAGE
    this.route.url.subscribe(urlSegment => {

      if(urlSegment[0]+'/'+urlSegment[1]==='manager/home'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='manager/appointments'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='manager/notifications'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='manager/services'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='manager/preferences'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='manager/users'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
    })
  }
  
}