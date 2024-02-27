import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-header-employe',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './header-employe.component.html',
  styleUrl: './header-employe.component.css'
})
export class HeaderEmployeComponent {

  constructor(private loginService: LoginComponent){}
  onLogout(): void{
    this.loginService.onLogout();
  }
  
}
