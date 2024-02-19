import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseUrl } from '../../BaseUrl';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ NgIf, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  name: string = "";
  firstname: string = "";
  email: string = "";
  contact: string = "";
  // par default du role 1(client)
  role: number = 1;
  password: string = "";
  confirmpassword: string = "";
  errorMessage: string = "";
  
  constructor(private baseUrl: BaseUrl, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute){}
  
  onSubmit(){
    console.log("NAME : "+this.name);
    console.log("FIRSTNAME : "+this.firstname);
    console.log("EMAIL : "+this.email);
    console.log("CONTACT : "+this.contact);
    console.log("ROLE : "+this.role);
    console.log("PASSWORD : "+this.password);
    console.log("CONFIRM-PASSWORD : "+this.confirmpassword);

    const credentials = {
      name: this.email,
      firstname: this.firstname,
      email: this.email,
      password: this. password,
      contact: this.contact,
      role: this.role
    }

    if(this.name==="" || this.firstname==="" || this.email==="" || this.password==="" || this.confirmpassword==="" || this.contact===""){
      this.errorMessage = 'need_complete';
      console.log(this.errorMessage)
      this.router.navigateByUrl('/register');
      
    } else {
      if(this.password.length < 8){
        this.errorMessage = 'password_inferior';
        this.router.navigateByUrl('/register');
      } else {
        if(this.password!==this.confirmpassword){
          this.errorMessage = 'not_equals';
          this.router.navigateByUrl('/register');
        } else {

          this.http.post(`${this.baseUrl.getBaseUrl()}/users/signup`, credentials, {
            headers: new HttpHeaders().set('Content-Type','application/json')})
          .subscribe((data: any) => {
            localStorage.setItem("local", data.insertedId);
            this.router.navigateByUrl('/home');
          })
        }
      }
    }
  }

  ngOnInit(): void {
      
  }

}
