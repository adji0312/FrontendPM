import { Component, OnInit } from '@angular/core';
import { Chart, registerables, scales } from 'chart.js';
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
    this.createResourceChart();

  }


  createBacklogDevChart(){

    var statusLabel = [];
    var statusCount: number[] = [];

    this.backlogDevService.countByStatus(this.loginuser.token).subscribe(data => {

      statusLabel = data;

      for(let i=0; i<statusLabel.length;i++){
        statusCount[i] = statusLabel[i].slice(-1)
      }

      new Chart("backlogDev", {
        type: 'doughnut',
        data: {
            labels: statusLabel,
            datasets: [{
                data: statusCount,
                backgroundColor: [
                    '#FFE15D',
                    '#F49D1A',
                    '#DC3535',
                    '#B01E68',
                ],
                borderColor: "#FFFFFF",
                borderWidth: 1
            }]
        },
        options:{
          plugins:{
            legend:{
              position: 'right',
              labels:{
                usePointStyle: true,
                pointStyle: 'rectRot',
                color: 'black',
                font:{
                  size: 15
                },
              },
            },
            tooltip: {
              usePointStyle: true,
            }
          },
          responsive: true,
          layout:{
            padding:{
              bottom: 100
            }
          },
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
                        '#BFEAF5',
                        '#82AAE3',
                    ],
                    borderColor: "#FFFFFF",
                    borderWidth: 1
                }]
            },
            options:{
              plugins:{
                legend:{
                  position: 'right',
                  fullSize: true,
                  labels:{
                    usePointStyle: true,
                    pointStyle: 'rectRot',
                    color: 'black',
                    font:{
                      size: 15
                    },
                  },
                  
                },
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

  createResourceChart(){
      var roleLabels = [];
      var roleCount: number[] = [];

      this.userService.countUserByRole(this.loginuser.token).subscribe(data => {
        roleLabels = data;

        for(let i=0; i<roleLabels.length;i++){
          roleCount[i] = roleLabels[i].slice(-1)
        }

        new Chart("resourceChart", {
          type: 'doughnut',
          data: {
              labels: roleLabels,
              datasets: [{
                  data: roleCount,
                  backgroundColor: [
                      '#FFDB89',
                      '#FDE4CF',
                      '#F1C0E8',
                      '#CFBAF0',
                      '#A3C4F3',
                      '#8EECF5',
                      '#B9FBC0'
                  ],
                  borderColor: "#FFFFFF",
                  borderWidth: 1
              }]
          },
          options:{
            plugins:{
              legend:{
                position: 'right',
                fullSize: true,
                labels:{
                  usePointStyle: true,
                  pointStyle: 'rectRot',
                  color: 'black',
                  font:{
                    size: 15
                  },
                },
              },
            },
            responsive: true,
            layout:{
              padding:{
                bottom: 100
              }
            },
          },
        });

      });
  }



}
