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
  users2: [] = [];

  checkedValues: string[]=[];
  userClientId: string = "";
  userEmptId: string = "";

  constructor(
    private loginService: LoginComponent, 
    private baseUrl: BaseUrl, 
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute){}

  onChange(value: string, isChecked: boolean){
    if(isChecked){
      this.checkedValues.push(value);
    } else {
      const index = this.checkedValues.indexOf(value);
      if(index !== -1){
        this.checkedValues.splice(index, 1);
      }
    }
  }

  test_appointment(){
    console.log(this.checkedValues);
    console.log(this.userClientId);
    console.log(this.userEmptId);
  }

  ngOnInit(): void {

    const localId = localStorage.getItem('local');
    if(localId!==null){
      this.userId = JSON.parse(localId);
    }

    this.http.get(`${this.baseUrl.getBaseUrl()}/services/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      // console.log(JSON.stringify(data));
      this.services = data.services;
      console.log(this.services);
      // console.log(JSON.stringify(this.users))
      // this.router.navigateByUrl('/appointments/employes?date='+this.date+"&time="+this.time);
    })

    this.http.get(`${this.baseUrl.getBaseUrl()}/users/employes`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      // console.log(JSON.stringify(data));
      this.users2 = data.users;
      console.log(this.users2);
      // console.log(JSON.stringify(this.users))
      // this.router.navigateByUrl('/appointments/employes?date='+this.date+"&time="+this.time);
    })    

    console.log("LOCALLLLL..... "+localStorage.getItem('local'));
    const local = localStorage.getItem('local');

    if(localStorage.getItem('local')===null){
      console.log("LOCAL IS NULL")
      this.router.navigateByUrl('/login'); 

    } else {
      console.log("OKAY LOCAL")
      this.http.get(`${this.baseUrl.getBaseUrl()}/user/`+local, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data: any) => {
        console.log(JSON.stringify(data));
  
        if(data.id!==undefined){
          console.log("OKAY IS PRESENT......")
          // localStorage.setItem("local", data.id);
          // this.router.navigateByUrl('/home');
        } else {
          console.log("WTFUCK....");
          localStorage.removeItem("local");
          this.router.navigateByUrl('/login');
        }
      })
    }
    
  }
}
