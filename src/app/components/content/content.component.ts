import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseUrl } from '../../BaseUrl';
import { NotificationComponent } from '../notification/notification.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ServiceComponent } from '../service/service.component';
import { CookieService } from 'ngx-cookie-service';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  isRoute: string = '';
  errorMessage: string = "";
  isSubmit: boolean = false;
  
  user: any = [];
  employes: any = [];
  services: any = [];
  appointments: any = [];
  appointmentsById: any = [];
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
    private cookie: CookieService,
    private preferenceService: PreferenceComponent){}


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
  getListOfAppointmentsByCustomerID() {
    const credentials = {iduser: this.local}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/clientAppointment`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.appointmentsById = data.userappointments;
      console.log(data.userappointments)
    })};

  getEmployNotBusy(){
    this.getListServices();
    this.get_user_available_by_datetime(this.datetime);
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
        // console.log(this.checkedValues.splice(index, 1))
      }
    }
  }

// ADD APPOINTMENTS
  add_appointment(){
    let userClientId = localStorage.getItem('local')?.toString();  
    let status = "in progress";

    const credentials = {servicesId:this.checkedValues, userClientId:userClientId, userEmpId:this.userEmpId, datetime:this.datetime, status:status, description:this.description}
      this.http.post(`${this.baseUrl.getBaseUrl()}/appointments/add`, credentials, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data: any) => {

      })
    this.router.navigateByUrl('/appointments');
  }

// GET USER AVALAIBLE
  get_user_available_by_datetime(datetim: string = this.datetime){
    const credentials = { datetime: datetim+":00.000Z" }
      this.http.post(`${this.baseUrl.getBaseUrl()}/users/available`, credentials, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data: any) => {
        this.employes = data.employesList;
        // console.log(this.employes);
      })
  }

  getDetailUser(iduser: string = this.local) {
    const credentials = {iduser: iduser}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/detailUser`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {
      this.user = data.employedetails;
      // console.log(this.user);
    })};

  ngOnInit(): void {

    this.getDetailUser();
    this.getListOfAppointmentsByCustomerID();
    // this.getClientAppointment();

    // console.log(this.route.snapshot.queryParams['date']);
    // console.log(this.route.snapshot.queryParams['time']);
    // console.log(this.route.snapshot.routeConfig?.path);
    // console.log(this.route.snapshot.params['idea']);

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
      if(urlSegment[urlSegment.length - 1].path === 'appointments'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
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
