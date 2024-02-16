import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingComponent } from '../meeting/meeting.component';
import { NotificationComponent } from '../notification/notification.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ServiceComponent } from '../service/service.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NgIf, NotificationComponent, MeetingComponent, ServiceComponent, PreferenceComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  isRoute: string = ''

  constructor( private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.route.url.subscribe(urlSegment => {
      if(urlSegment[urlSegment.length - 1].path === 'meetings'){
        console.log(urlSegment[urlSegment.length - 1].path)
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
      if(urlSegment[urlSegment.length - 1].path === 'notifications'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
      if(urlSegment[urlSegment.length - 1].path === 'services'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
      if(urlSegment[urlSegment.length - 1].path === 'preferences'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
      if(urlSegment[urlSegment.length - 1].path === 'home'){
        this.isRoute = urlSegment[urlSegment.length - 1].path;
      }
    })
  }
}
