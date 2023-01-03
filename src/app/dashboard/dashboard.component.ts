import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BacklogDevelopmentService } from '../backlogDev/backlog-development.service';
import { LoginAuthService } from '../login-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public statusLabel = Array();
  public statusCount = Array();

  public loginuser: any = {};

  constructor(
    private backlogDevService: BacklogDevelopmentService,
    private authservice: LoginAuthService
  ) { 
    Chart.register(...registerables);

    this.authservice.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  ngOnInit(): void {

    this.statusLabel = ['KIC', 'DEV', 'SIT', 'READY UAT'];
    this.statusCount = [0,0,0,0];

    this.backlogDevService.countByStatus(this.loginuser.token).subscribe(data => {

      for(let i=0; i<this.statusLabel.length; i++){
        if(data[i]){
          this.statusCount[i] = data[i];
        }
      }

      for(let i=0; i<this.statusCount.length; i++){
        if(this.statusLabel[i]){
          this.statusLabel[i] = String(this.statusLabel.at(i)?.concat(" : " + String(this.statusCount.at(i))));
        }
      }

      var noData = this.statusCount.every(item => item === 0);
      
      if(noData){
        return;
      }

      this.createChart();

    });
  }

  createChart(){
    var myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
          labels: this.statusLabel,
          datasets: [{
              data: this.statusCount,
              backgroundColor: [
                  '#A6B1E1',
                  '#EA9ABB',
                  '#C4DFAA',
                  '#D7C0AE',
              ],
              // borderColor: [
              //     'rgba(255, 99, 132, 1)',
              //     'rgba(54, 162, 235, 1)',
              //     'rgba(75, 192, 192, 1)',
              //     'rgba(153, 102, 255, 1)',
              // ],
              // borderWidth: 1
          }]
      },
      options:{
        plugins:{
          legend:{
            position: 'right',
            fullSize: true,
            labels:{
              font:{
                size: 15
              }
            }
          }
        },
        responsive: true,
        layout:{
          padding:{
            bottom: 100
          }
        }
      },
      
    })
  }

}
