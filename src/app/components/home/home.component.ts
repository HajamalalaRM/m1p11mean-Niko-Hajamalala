import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUrl } from '../../BaseUrl';
import { ContentComponent } from '../content/content.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';
import { NotificationComponent } from '../notification/notification.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, HttpClientModule, HeaderComponent, ContentComponent, NotificationComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  
  userId: string = "";
  errorMessage: string="";
  services: [] = [];
  employes: [] = [];

  checkedValues: string[]=[];
  userClientId: string = "";
  userEmpId:string = "";
  dateAppoint: string = "";

  constructor(
    private loginService: LoginComponent, 
    private baseUrl: BaseUrl, 
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute){}


test_appointment(){  
  let userClientId = localStorage.getItem('local')?.toString();  
  console.log(userClientId);
  let status = "in progress";
  let description = "Birthday party";

  const credentials = {servicesId:this.checkedValues,userClientId:userClientId,userEmpId:this.userEmpId,datetime:this.dateAppoint, status:status, description:description}
    this.http.post(`${this.baseUrl.getBaseUrl()}/appointments/test`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      console.log()
    })
  // this.router.navigateByUrl('/login');
}
onChangeDate(date: string){
  this.dateAppoint = date;
}
  onChangeEmp(str: string){    
    console.log("STRRRR : "+str)
    this.userEmpId = str
  }
  onChange(event: any,serviceId: any){
    // console.log("CHANGED: "+serviceId)
    console.log("List: "+this.checkedValues)
    if(event.target.checked){
      this.checkedValues.push(serviceId);
    } else {
      const index = this.checkedValues.indexOf(serviceId);
      if(index !== -1){
        this.checkedValues.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {

    const localId = localStorage.getItem('local');
    if(localId!==null){
      // this.userId = JSON.parse(localId);
    }

    this.http.get(`${this.baseUrl.getBaseUrl()}/services/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      // console.log(JSON.stringify(data));
      this.services = data.services;
      console.log("SERVICES")
      console.log(this.services);
      // console.log(JSON.stringify(this.users))
      // this.router.navigateByUrl('/appointments/employes?date='+this.date+"&time="+this.time);
    })

    this.http.get(`${this.baseUrl.getBaseUrl()}/users/employes`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      // console.log(JSON.stringify(data));
      this.employes = data.users;
      // console.log("employes: "+this.employes);
      // console.log(JSON.stringify(this.users))
      // this.router.navigateByUrl('/appointments/employes?date='+this.date+"&time="+this.time);
    })    

    // console.log("LOCALLLLL..... "+localStorage.getItem('local'));
    const local = localStorage.getItem('local');

    if(localStorage.getItem('local')===null){
      // console.log("LOCAL IS NULL")
      this.router.navigateByUrl('/login'); 

    } else {
      // console.log("OKAY LOCAL")      
    }
    
  }
}
