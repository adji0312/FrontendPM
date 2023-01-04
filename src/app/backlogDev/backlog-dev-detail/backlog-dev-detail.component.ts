import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/login-auth.service';
import { ProjectPicService } from 'src/app/projectPIC/project-pic.service';
import { ProjectPIC } from 'src/app/projectPIC/projectPIC';
import { BacklogDevelopmentService } from '../backlog-development.service';
import { BacklogDevelopment } from '../backlogDevelopment';

@Component({
  selector: 'app-backlog-detail',
  templateUrl: './backlog-dev-detail.component.html',
  styleUrls: ['./backlog-dev-detail.component.css']
})
export class BacklogDevDetailComponent implements OnInit {

  viewBacklogDev: BacklogDevelopment = new BacklogDevelopment;
  viewPICDevs!: ProjectPIC[];
  viewPICPM!: string;

  public loginuser: any = {};

  // editBacklogDevForm!: FormGroup;

  constructor(
    private backlogDevService: BacklogDevelopmentService,
    private projectPICService: ProjectPicService,
    private router: Router,
    private authservice: LoginAuthService
    ) {
      this.authservice.isLoggedIn();
      this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
    }

  ngOnInit(): void {
    this.viewBacklogDev = this.backlogDevService.viewBacklogDev;

    this.projectPICService.getProjectPICDev(this.viewBacklogDev.backlog_code, this.loginuser.token).subscribe(data => {
      this.viewPICDevs = data;
    });

    this.projectPICService.getProjectPICPM(this.viewBacklogDev.backlog_code, this.loginuser.token).subscribe(data => {
      if(data == null){
        this.viewPICPM = "";
      }else{
        this.viewPICPM = data.pic_name;
      }
    });

  }

  closeBacklogDevDetail(){
    this.router.navigate(['/backlogDevelopment']);
  }

}
