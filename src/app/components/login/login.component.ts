import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseUrl } from '../../BaseUrl';

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
  

  constructor(private baseUrl: BaseUrl, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute){}
  
  onSubmit(){
    // debugger
    console.log("EMAIL : "+this.email);
    console.log("PASSWORD : "+this.password);
    const credentials = { email: this.email, password: this.password}
    
    
    if(this.email === "" || this.password === ""){
      this.errorMessage = 'need_complete';
      this.user_is_in_local();
      this.router.navigateByUrl('/login');
    } else {

      this.http.post(`${this.baseUrl.getBaseUrl()}/signin`, credentials, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data: any) => {
  
        if(data.id!==undefined){
          localStorage.setItem("local", data.id);
          this.router.navigateByUrl('/home');
        } else {
          this.errorMessage = 'user_not_exist';
          this.router.navigateByUrl('/login'); 
        }
      })
    }
  }

  onLogout(): void{
    localStorage.removeItem('local');
    this.errorMessage = 'logout';
    this.router.navigateByUrl('/login');
  }

  user_is_in_local() {
    const local = localStorage.getItem('local');

    if(local!==null){
      this.http.get(`${this.baseUrl.getBaseUrl()}/user/`+local, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data: any) => {
        console.log(JSON.stringify(data));
  
        if(data._id!==undefined){
          console.log("OKAY IS PRESENT......")
          localStorage.setItem("local", data._id);
          this.router.navigateByUrl('/home');
        } else {
          console.log("WTFUCK....");
          localStorage.removeItem("local");
          this.router.navigateByUrl('/login');
        }
      })
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
    this.user_is_in_local();
  }
}