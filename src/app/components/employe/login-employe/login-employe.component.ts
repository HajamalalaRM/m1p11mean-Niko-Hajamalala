import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../../BaseUrl';

@Component({
  selector: 'app-login-employe',
  standalone: true,
  imports: [ NgIf, FormsModule, HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login-employe.component.html',
  styleUrl: './login-employe.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class LoginEmployeComponent implements OnInit{

  email: string = "emp1@gmail.com";
  password: string ="employe";
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

  urlNavigate: string = "";
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

            const credentials = {iduser: data.id}
            this.http.post(`${this.baseUrl.getBaseUrl()}/users/detailUser`, credentials, {
              headers: new HttpHeaders().set('Content-Type', 'application/json')})
              .subscribe((data:any) => {

                this.role_user = data.employedetails[0].role;
                localStorage.setItem("local", credentials.iduser);
                // this.cookie.set('_local', credentials.iduser);

                if(this.role_user === 1){
                  this.urlNavigate = "/home";
                }
                if(this.role_user === 2){
                  this.urlNavigate = "/employe/home";
                }
                if(this.role_user === 3){
                  this.urlNavigate = "/manager/home";
                }

              this.router.navigateByUrl(this.urlNavigate);
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
    // this.cookie.delete('_local');

    this.errorMessage = 'logout';
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    if(localStorage.getItem('local')){

    } else {
      this.router.navigateByUrl('/employe/login');
    }
  }
}