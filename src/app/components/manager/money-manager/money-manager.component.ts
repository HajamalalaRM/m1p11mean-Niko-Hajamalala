import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../../BaseUrl';
import { HeaderManagerComponent } from '../header-manager/header-manager.component';
import { NotificationManagerComponent } from '../notification-manager/notification-manager.component';
import { PreferenceManagerComponent } from '../preference-manager/preference-manager.component';
import { ServiceManagerComponent } from '../service-manager/service-manager.component';

@Component({
  selector: 'app-money-manager',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, ServiceManagerComponent, NotificationManagerComponent, PreferenceManagerComponent, HeaderManagerComponent],
  templateUrl: './money-manager.component.html',
  styleUrl: './money-manager.component.css'
})
export class MoneyManagerComponent  implements OnInit {

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl,
    private cookie: CookieService){}
    
  transactions: any = [];
  getListTransaction(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/payements/transactions`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.transactions = data.data;
      // console.log(this.transactions);
    })
  }

  
  validateRequest(id: string){
    this.http.post(`${this.baseUrl.getBaseUrl()}/users/validate_money_request`, {idtransaction:id}, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      // console.log(data);
      alert('Validation of money complete!');
      location.reload();
    })
  }

  ngOnInit(): void {
    this.getListTransaction();
  }

}
