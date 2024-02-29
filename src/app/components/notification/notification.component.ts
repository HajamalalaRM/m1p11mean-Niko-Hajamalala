import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../BaseUrl';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  
  offers: any = [];
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl,
    private cookie: CookieService) {}

    getOfferList() {
      this.http.get(`${this.baseUrl.getBaseUrl()}/offers/offerList`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
        .subscribe((data:any) => {
        this.offers = data.offers;
    })};

  ngOnInit(): void {
    // console.log("ETOOO...")
    this.getOfferList();
  }

}
