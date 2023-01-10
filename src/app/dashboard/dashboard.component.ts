import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BacklogDevelopmentService } from '../backlogDev/backlog-development.service';
import { LoginAuthService } from '../login-auth.service';
import { ProjectPicService } from '../projectPIC/project-pic.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public loginuser: any = {};

  constructor(
    private backlogDevService: BacklogDevelopmentService,
    private authservice: LoginAuthService,
    private userService: UserService,
    private projectPICService: ProjectPicService
  ) { 
    Chart.register(...registerables);

    this.authservice.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  ngOnInit(): void {

    this.createBacklogDevChart();
    this.createDevChart();
    

  }


  createBacklogDevChart(){

    var statusLabel = ['KIC', 'DEV', 'SIT', 'READY UAT'];
    var statusCount = [0,0,0,0];

    statusLabel = ['KIC', 'DEV', 'SIT', 'READY UAT'];
    statusCount = [0,0,0,0];

    this.backlogDevService.countByStatus(this.loginuser.token).subscribe(data => {

      for(let i=0; i<statusLabel.length; i++){
        if(data[i]){
          statusCount[i] = data[i];
        }
      }

      for(let i=0; i<statusCount.length; i++){
        if(statusLabel[i]){
          statusLabel[i] = String(statusLabel.at(i)?.concat(" : " + String(statusCount.at(i))));
        }
      }

      var noData = statusCount.every(item => item === 0);
      
      if(noData){
        return;
      }

      new Chart("backlogDev", {
        type: 'doughnut',
        data: {
            labels: statusLabel,
            datasets: [{
                data: statusCount,
                backgroundColor: [
                    '#A6B1E1',
                    '#EA9ABB',
                    '#C4DFAA',
                    '#D7C0AE',
                ],
                borderColor: "#FFFFFF",
                borderWidth: 1
            }]
        },
        options:{
          plugins:{
            legend:{
              position: 'bottom',
              fullSize: true,
              labels:{
                color: 'black',
                font:{
                  size: 15
                },
              },
              
            },
            tooltip: {
              enabled: false
            }
          },
          responsive: true,
          layout:{
            padding:{
              bottom: 100
            }
          }
        },
        
      });

    });

    
  }

  createDevChart(){
    var statusLabel = ['Sudah di assign : ', 'Belum di assign : '];
    var statusCount = [0,0];

    var unassigned;

    this.userService.getUserByRole("DEV", this.loginuser.token).subscribe(data => {

        this.projectPICService.countPICDev(this.loginuser.token).subscribe(PICDevCount => {
          unassigned = (data.length) - PICDevCount;      

          statusCount[0] = PICDevCount;
          statusCount[1] = unassigned;
  
          statusLabel[0] = String(statusLabel[0].concat(String(statusCount[0])));
          statusLabel[1] = String(statusLabel[1].concat(String(statusCount[1])));
          
          new Chart("devChart", {
            type: 'doughnut',
            data: {
                labels: statusLabel,
                datasets: [{
                    data: statusCount,
                    backgroundColor: [
                        '#A6B1E1',
                        '#EA9ABB',
                        '#C4DFAA',
                        '#D7C0AE',
                    ],
                    borderColor: "#FFFFFF",
                    borderWidth: 1
                }]
            },
            options:{
              plugins:{
                legend:{
                  position: 'bottom',
                  fullSize: true,
                  labels:{
                    color: 'black',
                    font:{
                      size: 15
                    },
                  },
                  
                },
                tooltip: {
                  enabled: false
                }
              },
              responsive: true,
              layout:{
                padding:{
                  bottom: 100
                }
              }
            },
            
          });
        })

      
    });
  }



}
