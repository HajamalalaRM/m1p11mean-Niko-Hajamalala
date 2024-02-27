import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseUrl } from '../../../BaseUrl';

@Component({
  selector: 'app-service-manager',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink],
  templateUrl: './service-manager.component.html',
  styleUrl: './service-manager.component.css'
})
export class ServiceManagerComponent implements OnInit {

  servicesList: any=[];
  
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl){}

  getListServices(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/services/list`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.servicesList = data.services;
      console.log(this.servicesList)
    })
  }

  //ADD NEW SERVICE
  isSubmitNewServ: boolean = false;
  isSubmitNewService(){
    this.isSubmitNewServ = true;
  }
  
  serviceName: string = "";
  serviceDelay: string = "";
  servicePrice: string = "";
  onChangeServiceName(serviceName: string){ this.serviceName = serviceName; }
  onChangeServiceDelay(serviceDelay: string){ this.serviceDelay = serviceDelay; }
  onChangeServicePrice(servicePrice: string){ this.servicePrice = servicePrice; }
  
  addNewService(){
    if(this.serviceName==='' || this.serviceDelay==='' || this.servicePrice===''){
      location.reload();
      alert("You must to complete those field! ")
    } else {
      
      const credentials = { name: this.serviceName, coast: this.servicePrice, durationMinute: this.serviceDelay }
      this.http.post(`${this.baseUrl.getBaseUrl()}/services/add`, credentials, {
          headers: new HttpHeaders().set('Content-Type', 'application/json')})
          .subscribe((data: any) => {
          location.reload();
      });
    }
  }
  
  //DELETE SERVICE PREFERED BY CLIENT
  isSubmitDeleteService: boolean = false;
  deleteServ(){
    this.isSubmitDeleteService = true;
  }

  service_id: string = "";
  deleteService(id: string){
    this.service_id = id;
    this.deleteServiceByManager();
    this.router.navigateByUrl('services');
    location.reload();
  }
  
  deleteServiceByManager(idservice: string = this.service_id) {
    const credentials = {idservice: idservice}
    this.http.post(`${this.baseUrl.getBaseUrl()}/services/removeService`, credentials, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data:any) => {

  })};  

  ngOnInit(): void {
    this.getListServices();
  }
}
