import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseUrl } from '../../BaseUrl';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NgIf, FormsModule, HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent implements OnInit{

  email: string = "";
  password: string ="";
  errorMessage: string="";
  isSubmited: boolean = false;
  date: string="";
  user: any;
  role_user: number = 0;

  constructor(
    private baseUrl: BaseUrl, 
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService){}

  onSubmit(){
    const credentials = { email: this.email, password: this.password}
    
    if(this.email === "" || this.password === ""){
      this.errorMessage = 'need_complete';
      this.router.navigateByUrl('/login');
    } else {

      this.http.post(`${this.baseUrl.getBaseUrl()}/users/signin`, credentials, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data: any) => {
  
        if(data.id!==undefined){

            localStorage.setItem("local", data.id);
            this.cookie.set('_local', data.id);
            const credentials = {iduser: data.id}
            this.http.post(`${this.baseUrl.getBaseUrl()}/users/detailUser`, credentials, {
              headers: new HttpHeaders().set('Content-Type', 'application/json')})
              .subscribe((data:any) => {
                this.role_user = data.employedetails[0].role;

                console.log("ROLE_USER ID----- "+this.role_user);
                if(this.role_user === 1){
                  this.router.navigateByUrl('/home');
                }
                if(this.role_user === 2){
                  this.router.navigateByUrl('/employe/home');
                }
                if(this.role_user === 3){
                  this.router.navigateByUrl('/manager/home');
                }
            });

        } else {
          this.errorMessage = 'user_not_exist';
          this.router.navigateByUrl('/login');
        }
      })
    }
  }

  onLogout(): void{
    localStorage.removeItem('local');
    this.cookie.delete('_local');

    this.errorMessage = 'logout';
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    
  }
}