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
  imports: [NgIf, NgFor, RouterLink, FormsModule, NotificationComponent, ServiceComponent, PreferenceComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class ContentComponent implements OnInit {

  isRoute: string = '';
  urlList: string = '';
  date: string = "";
  time: string = "";
  errorMessage: string = "";
  isSubmit: boolean = false;
  users: [] = [];

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl){}
  

  // APPOINTMENTS
  getEmployNotBusy(){
    console.log("DATE = "+this.date);
    console.log("TIME = "+this.time);
    if(this.date ==="" || this.time ===""){
      console.log('You must be given the date and time..');
      this.errorMessage = "need_complete_date_&time";
      this.router.navigateByUrl('/appointments');
    } else {
      this.isSubmit = true;

      // //GET LIST EMPLOYES
    // this.http.get(`${this.baseUrl.getBaseUrl()}/utilisateurs`, {
    //   headers: new HttpHeaders().set('Content-Type', 'application/json')})
    // .subscribe((data: any) => {
    //   // console.log(JSON.stringify(data));
    //   this.users = data;
    //   console.log(this.users);
    //   // console.log(JSON.stringify(this.users))
      this.router.navigateByUrl('/appointments/employes?date='+this.date+"&time="+this.time);
    // })      

    }
  }

  // SERVICES
  showListServices(id: string, name: string, firstname: string){
    console.log("WELCOME AT SERVICES FUNCTION")
    console.log("IDDDD === "+id);
    console.log(this.route.snapshot.queryParams['date']);
    console.log(this.route.snapshot.queryParams['time']);
    console.log(this.route.snapshot);
   
    this.router.navigateByUrl('/appointments/employes?date='+
    this.route.snapshot.queryParams['date']+"&time="+
    this.route.snapshot.queryParams['time']+'&name='+name+'&firstname='+firstname+'&id='+id);
  }

  ngOnInit(): void {

      // //GET LIST EMPLOYES
      this.http.get(`${this.baseUrl.getBaseUrl()}/utilisateurs`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data: any) => {
        // console.log(JSON.stringify(data));
        this.users = data;
        console.log(this.users);
        // console.log(JSON.stringify(this.users))
        // this.router.navigateByUrl('/appointments/employes?date='+this.date+"&time="+this.time);
      })  

    console.log(this.route.snapshot.queryParams['date']);
    console.log(this.route.snapshot.queryParams['time']);
    console.log(this.route.snapshot.routeConfig?.path);
    console.log(this.route.snapshot.params['idea']);

    this.route.url.subscribe(urlSegment => {
      console.log("SEG /0 = "+urlSegment[0]);
      console.log("SEG /1 = "+urlSegment[1]);
      
      if(urlSegment[urlSegment.length - 1].path === 'appointments'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
      if(urlSegment[0]+'/'+urlSegment[1]==='appointments/employes'){
        this.isRoute = urlSegment[0]+'/'+urlSegment[1];
        console.log(this.isRoute)
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
