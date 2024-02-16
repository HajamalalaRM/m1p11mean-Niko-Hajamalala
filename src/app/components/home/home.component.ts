import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUrl } from '../../BaseUrl';
import { ContentComponent } from '../content/content.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MeetingComponent } from '../meeting/meeting.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, HeaderComponent, ContentComponent, MeetingComponent, NotificationComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{

  errorMessage: string="";

  constructor(private baseUrl: BaseUrl, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {

    console.log("LOCALLLLL..... "+localStorage.getItem('local'));
    const local = localStorage.getItem('local');

    if(localStorage.getItem('local')===null){
      console.log("LOCAL IS NULL")
      this.router.navigateByUrl('/login'); 

    } else {
      console.log("OKAY LOCAL")
      this.http.get(`${this.baseUrl.getBaseUrl()}/user/`+local, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data: any) => {
        console.log(JSON.stringify(data));
  
        if(data._id!==undefined){
          console.log("OKAY IS PRESENT......")
          // localStorage.setItem("local", data.id);
          // this.router.navigateByUrl('/home');
        } else {
          console.log("WTFUCK....");
          localStorage.removeItem("local");
          this.router.navigateByUrl('/login');
        }
      })
    }
    
  }
}
