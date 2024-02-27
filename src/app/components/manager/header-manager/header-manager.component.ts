import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-header-manager',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './header-manager.component.html',
  styleUrl: './header-manager.component.css'
})
export class HeaderManagerComponent  {

  constructor(private loginService: LoginComponent){}
  onLogout(): void{
    this.loginService.onLogout();
  }
  
}
