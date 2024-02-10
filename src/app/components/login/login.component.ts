import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  message: string = 'WELCOME TO YOU....';

  
  constructor(private http: HttpClient, private router: Router ){}

  onLogin(){
    this.http.get('http://localhost:9008/api/v1/getprofil').subscribe((data: any) => {
      if(data.email==="niko@gmail.com") {
        alert("OKOKOKOK..")
        this.router.navigateByUrl('/accueil');
      } else {
        alert("ERREURRRRR......");
      }
    })
  }
}

export class Login {
  email: String;
  nom: String;
  constructor(private http: HttpClient){
    this.email='';
    this.nom='';
  }
}