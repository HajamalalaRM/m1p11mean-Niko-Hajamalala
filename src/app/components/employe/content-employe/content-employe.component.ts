import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../../BaseUrl';
import { HeaderEmployeComponent } from '../header-employe/header-employe.component';
import { NotificationEmployeComponent } from '../notification-employe/notification-employe.component';
import { PreferenceEmployeComponent } from '../preference-employe/preference-employe.component';
import { ServiceEmployeComponent } from '../service-employe/service-employe.component';

@Component({
  selector: 'app-content-employe',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, ServiceEmployeComponent, NotificationEmployeComponent, PreferenceEmployeComponent, HeaderEmployeComponent],
  templateUrl: './content-employe.component.html',
  styleUrl: './content-employe.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class ContentEmployeComponent implements OnInit {

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

  // local: string = this.cookie.get('_local');
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
  getListOfAppointmentsByCustomerID() {
    let local = localStorage.getItem('local')?.toString();
    const credentials = {iduser: local}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/empAppointment`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.appointmentsById = data.userappointments;
      // console.log(this.appointmentsById);
    })};


  getDetailUser() {
    let local = localStorage.getItem('local')?.toString();
    const credentials = {iduser: local}
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/detailUser`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {
      this.user = data.employedetails;
      // console.log(this.user);
    })};

  idAppoint: string ="";
  isSubmitPayement: boolean = false;
  payement(id:string){
    this.idAppoint = id;
    this.isSubmitPayement = true;
    this.getPayValue();
  }

  coastSum: string = "";
  coastSum1: string = "";
  onChangeCoastSum1(coastSum1: string){ this.coastSum1 = coastSum1; }

  getPayValue() {
    const credentials = {idappointment: this.idAppoint}
    this.http.post(`${this.baseUrl.getBaseUrl()}/payements/waitting_payement`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {
      this.coastSum = data.data[0].coastSumFinal;
      this.coastSum1 = data.data[0].coastSumFinal;
  })};

  paye() {
    const credentials = {idappointment: this.idAppoint, pay: this.coastSum1}
    this.http.post(`${this.baseUrl.getBaseUrl()}/payements/pay`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {
        // console.log("PAYEMENT SUCCESSFUL...")
        // console.log(data);
  })};

  //SEARCH
  description1: string = "";
  searchs: any = [];
  isSubmitSearch: boolean = false;

  onChangeDescription(description: string){ this.description1 = description; }
  search_description(){
    this.isSubmitSearch = true;
    let iduser = localStorage.getItem('local');
    const credentials = { search: this.description1, iduser: iduser}
    this.http.post(`${this.baseUrl.getBaseUrl()}/appointments/search/description`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {
        this.searchs = data.dataSearch;
        // console.log(data);

  })}

  ngOnInit(): void {

    this.getDetailUser();
    this.getListOfAppointmentsByCustomerID();
    // this.search_description();

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
      
      if(urlSegment[0]+'/'+urlSegment[1]==='employe/home'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='employe/appointments'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='employe/notifications'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='employe/services'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='employe/preferences'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
      }
    })
  }
  
}
