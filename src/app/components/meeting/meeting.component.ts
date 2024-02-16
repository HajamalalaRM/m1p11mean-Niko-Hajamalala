import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BaseUrl } from '../../BaseUrl';
import { ServiceComponent } from '../service/service.component';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [RouterLink, ServiceComponent, FormsModule],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent implements OnInit {

  date: string = "";
  time: string = "";

  constructor(private baseUrl: BaseUrl, private http: HttpClient, private router: Router){}
  searchEmployesNotBusy(){
    console.log(this.date);
    console.log(this.time);
    // this.router.navigateByUrl('/mettings/employes/notbusy');
  }

  ngOnInit(): void {
  
  }
}
