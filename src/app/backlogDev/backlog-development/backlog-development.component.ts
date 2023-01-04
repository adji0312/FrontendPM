import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, switchMap, timer } from 'rxjs';
import { ProjectPIC } from 'src/app/projectPIC/projectPIC';
import { User } from 'src/app/user/user';
import { BacklogDevelopmentService } from '../backlog-development.service';
import { BacklogDevelopment } from '../backlogDevelopment';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/login-auth.service';
import { UserService } from 'src/app/user/user.service';
import { ProjectPicService } from 'src/app/projectPIC/project-pic.service';

@Component({
  selector: 'app-backlog-development',
  templateUrl: './backlog-development.component.html',
  styleUrls: ['./backlog-development.component.css'],
})

export class BacklogDevelopmentComponent implements OnInit {

  backlogDevs!: BacklogDevelopment[];
  users!: User[];

  viewPICDevs!: ProjectPIC[];
  loginuser: any = {};
  formArray: any;

  editBacklogDev: BacklogDevelopment = new BacklogDevelopment;
  viewBacklogDev: BacklogDevelopment = new BacklogDevelopment;
  editBacklogDevForm!: FormGroup;

  picPM: ProjectPIC[] = [];
  picProLead: ProjectPIC[] = [];

  page: number = 1;
  count: number = 0;
  tableSize: number = 8;

  realTimeDataSubscription$!: Subscription;

  constructor(
    private backlogDevService: BacklogDevelopmentService,
    private userService: UserService,
    private projectPICService: ProjectPicService,
    private router: Router,
    private authService: LoginAuthService
  ) {
    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  ngOnInit(): void {
    this.getBacklogDevelopment();
    this.getPICPM();
  }


  private getBacklogDevelopment(){
    this.realTimeDataSubscription$ = timer(0, 1000)
    .pipe(switchMap(_ => this.backlogDevService.getAllBacklogDevelopment(this.loginuser.token)))
    .subscribe(data => {
      this.backlogDevs = data;
    });
  }


  private getPICPM(){
    this.userService.getUserByRole("PRO LEAD", this.loginuser.token).subscribe(data => {
      this.picPM = data;
    });
  }


  checkRole(backlogDev: BacklogDevelopment, index: number){

    if(this.loginuser.user.role.role_name == "SPV DEV"){
      return true;
    }else if(this.loginuser.user.role.role_name == "PRO LEAD" && backlogDev.backlog_status != "KIC" && backlogDev.pic_PM == this.loginuser.user.user_id){
      return true;
    }

    return false;
  }

  onTableDataChange(event: any){
    this.page = event;
    this.getBacklogDevelopment();
  }

  public onOpenModal(backlogDev: BacklogDevelopment, mode: string): void{
    const button = document.createElement('button');
    button.type = 'button';

    if(mode === 'edit'){
      this.backlogDevService.editBacklogDev = backlogDev;
      this.router.navigate(['/backlogDevEdit'], {skipLocationChange: true});
    }

    if(mode === 'view'){
      this.backlogDevService.viewBacklogDev = backlogDev;
      this.router.navigate(['/backlogDevDetail'], {skipLocationChange: true});
    }

    button.click();
  }


}
