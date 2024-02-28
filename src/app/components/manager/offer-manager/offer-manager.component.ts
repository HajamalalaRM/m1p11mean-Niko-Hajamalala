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
import { UserManagerComponent } from '../user-manager/user-manager.component';

@Component({
  selector: 'app-offer-manager',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, ServiceManagerComponent, NotificationManagerComponent, PreferenceManagerComponent, HeaderManagerComponent, UserManagerComponent],
  templateUrl: './offer-manager.component.html',
  styleUrl: './offer-manager.component.css'
})
export class OfferManagerComponent implements OnInit {
 
  offers: any = [];
  services: any = [];

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl,
    private cookie: CookieService){}

  getListOffers(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/offers/offerList`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.offers = data.offers;
      console.log(this.offers);
    });
  }

  getListServices(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/services/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.services = data.services;
      // console.log(JSON.stringify(this.services));
    })
  }

  //ADD NEW OFFRE
  checkedValues: string[]=[];

  servicesId: string = "";
  start: string = "";
  end: string = "";
  percentage: string = "";
  name: string = "";

  isSubmitNewOff: boolean = false;
  isSubmitNewOffer(){
    this.isSubmitNewOff = true;
  }
  
  onChangeName(name: string){ this.name = name; }
  onChangePercentage(percentage: string){ this.percentage = percentage; }
  onChangeStart(start: string){ this.start = start; }
  onChangeEnd(end: string){ this.end = end; }
  onChangeService(event: any, serviceId: any){
    if(event.target.checked){
      this.checkedValues.push(serviceId);
    } else {
      const index = this.checkedValues.indexOf(serviceId);
      if(index !== -1){
        this.checkedValues.splice(index, 1);
        console.log(this.checkedValues.splice(index, 1))
      }
    }
  }

  add_offer() {
    const credentials = {services:this.checkedValues, start:this.start, end:this.end, percentage:this.percentage, name:this.name}
      this.http.post(`${this.baseUrl.getBaseUrl()}/offers/add`, credentials, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data: any) => {
        console.log(data);
        location.reload();
      })
    this.router.navigateByUrl('manager/offers');
  }

  ngOnInit(): void {
    this.getListOffers();
    this.getListServices();
  }

}
