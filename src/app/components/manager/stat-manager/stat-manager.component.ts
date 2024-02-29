/* app.component.ts */
import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
 
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { BaseUrl } from '../../../BaseUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
@Component({
  selector: 'app-stat-manager',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './stat-manager.component.html',
  styleUrl: './stat-manager.component.css'
})
export class StatManagerComponent {

  chartOptions: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private baseUrl: BaseUrl) {

    const getMonthName = (month: number): string => {
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return months[month - 1]; // Subtract 1 because months array is zero-based
    };

    // Dynamic data transformation
    const data = [
      {
        "_id": {
          "year": 2024,
          "month": 2
        },
        "days": [
          { "day": 22, "count": 1 },
          { "day": 24, "count": 1 },
          { "day": 26, "count": 2 },
          { "day": 27, "count": 1 },
          { "day": 28, "count": 1 }
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 3
        },
        "days": [
          { "day": 6, "count": 1 },
          { "day": 7, "count": 2 }
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 4
        },
        "days": [
          { "day": 22, "count": 1 }
        ]
      }
    ];

    // Transform data into format accepted by CanvasJS
    const seriesData = data.map(monthData => ({
      type: "column",
      name: `${monthData._id.year}-${getMonthName(monthData._id.month)}`, // Use getMonthName function
      dataPoints: monthData.days.map(day => ({ label: day.day.toString(), y: day.count })) // Use 'label' property for x-axis
    }));

    // Set the transformed data to chartOptions
    this.chartOptions = {
      title: {
        text: "Angular Column Chart"
      },
      animationEnabled: true,
      axisX: { // Configure x-axis
        title: "Day",
        interval: 1
      },
      axisY: { // Configure y-axis
        title: "Count"
      },
      data: seriesData
    };
  }

  stats: any = [];
  getDataStat(){
    this.http.get(`${this.baseUrl.getBaseUrl()}/stats/reservation_day_month`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe((data: any) => {
      this.stats = data.services;
      console.log(this.stats);
    });
  }

  ngOnInit(): void {
    this.getDataStat();
  }
}                      