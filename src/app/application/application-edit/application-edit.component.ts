import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/login-auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApplicationService } from '../application.service';
import { Application } from '../application';
import { AppProgLangService } from 'src/app/list-filter-app/app-prog-lang/app-prog-lang.service';
import { AppOprSysService } from 'src/app/list-filter-app/app-opr-sys/app-opr-sys.service';
import { AppDatabaseService } from 'src/app/list-filter-app/app-database/app-database.service';
import { AppServerService } from 'src/app/list-filter-app/app-server/app-server.service';
import { ServerService } from 'src/app/list-filter-app/server/server.service';
import { AppTypeService } from 'src/app/list-filter-app/app-type/app-type.service';
import { ApplicationProgrammingLanguage } from 'src/app/list-filter-app/app-prog-lang/app-prog-lang';
import { ApplicationOperatingSystem } from 'src/app/list-filter-app/app-opr-sys/app-opr-sys';
import { ApplicationDatabase } from 'src/app/list-filter-app/app-database/app-database';
import { ApplicationServer } from 'src/app/list-filter-app/app-server/app-server';
import { Server } from 'src/app/list-filter-app/server/server';
import { ApplicationType } from 'src/app/list-filter-app/app-type/app-type';
import { Subscription, switchMap, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.css']
})
export class ApplicationEditComponent implements OnInit {

  public loginuser: any = {};
  editApplication: Application = new Application;
  editApplicationForm!: FormGroup;

  progLangs!: ApplicationProgrammingLanguage[];
  oprSys!: ApplicationOperatingSystem[];
  databases!: ApplicationDatabase[];
  serversApp!: ApplicationServer[];
  servers!: Server[];
  types!: ApplicationType[];
  applications: Application[] = [];

  realTimeDataSubscription$!: Subscription;

  selectedDevice:any = [];
  selectedType:any = [];
  selectedProgLang:any = [];
  selectedServer:any = [];
  selectedDatabase:any = [];
  selectedAppServer:any = [];
  selectedOprSys:any = [];
  // selectedAppName: any;
  // selectedAppDsc: any;

  devices: any = [];
  appTypes: any = [];
  appProgLangs: any = [];
  serverApp: any = [];
  appDatabases: any = [];
  appServers: any = [];
  oprSystems: any = [];
  appName: any = [];
  appDsc: any = [];

  // viewApplication: Application = new Application;
  constructor(
    private authservice: LoginAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private progLangService: AppProgLangService,
    private oprSysService: AppOprSysService,
    private databaseService: AppDatabaseService,
    private serversAppService: AppServerService,
    private serverService: ServerService,
    private typeService: AppTypeService
  ) { 
    this.authservice.isLoggedIn();
      this.authservice.isLoggedIn();
      this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
      this.editApplicationForm = this.formBuilder.group({
        application_name: [''],
        application_short_dsc: [''],
        application_device: [''],
        application_type: [''],
        application_programming_language: [''],
        application_database: [''],
        application_server: [''],
        application_operating_system: [''],
        server: [''],
    });

    // console.log();
    // console.log("a");
  }

  ngOnInit(): void {
    this.getProgLangs();
    this.getOprSys();
    this.getDabases();
    this.getServersApp();
    this.getServers();
    this.getTypes();
    this.getApplications();
    this.addList();
    
    this.editApplication = this.applicationService.editApp;
    
    //APP NAME
    console.log(this.editApplication.application_name);
    console.log("batas");
    console.log(this.appName);
    if(this.editApplication.application_name != null){
      const stringAppName = this.editApplication.application_name;
      // this.selectedAppName = stringAppName;
      this.appName[0] =  stringAppName;
      console.log(this.appName);
    }else{
      this.appName = '';
    }
    // console.log(this.appName);
    // console.log(this.selectedAppName);
    if(this.editApplication.application_short_dsc != null){
      const stringAppDsc = this.editApplication.application_short_dsc;
      // this.selectedAppDsc = stringAppDsc;
      this.appDsc[0] =  stringAppDsc;
      console.log(this.appDsc);
    }else{
      this.appDsc = '';
      console.log(this.appDsc);
    }
    // console.log(this.appDsc);



    // APP TYPE
    if(this.editApplication.application_type == null){
      this.appTypes = '';
    }else if(this.editApplication.application_type.match(',')){
      this.appTypes = this.editApplication.application_type.split(',');
      for(let i = 0 ; i < this.appTypes.length ; i++){
        this.selectedType[i] = this.appTypes[i];
      }
      // console.log(this.appTypes);
    }else{
      const appType = this.editApplication.application_type;
      this.appTypes[0] = appType;
      this.selectedType[0] = appType;
      // console.log(this.appTypes);
    }
    
    // APP DEVICE 
    if(this.editApplication.application_device == null){
      this.devices = '';
    }
    else if(this.editApplication.application_device.match(',')){
      this.devices = this.editApplication.application_device.split(',');
      for(let i = 0 ; i < this.devices.length ; i++){
        this.selectedDevice[i] = this.devices[i];
      }
      // console.log(this.selectedDevice);
    }else{
      const device = this.editApplication.application_device;
      this.devices[0] = device;
      this.selectedDevice[0] = device;
    }
    
    // APP PROG LANG
    if(this.editApplication.application_programming_language == null){
      this.appProgLangs='';
    }else if(this.editApplication.application_programming_language.match(',')){
      this.appProgLangs = this.editApplication.application_programming_language.split(',');
      for(let i = 0 ; i < this.appProgLangs.length ; i++){
        this.selectedProgLang[i] = this.appProgLangs[i];
      }
      // console.log(this.appProgLangs);
    }else{
      const appProgLang = this.editApplication.application_programming_language;
      this.appProgLangs[0] = appProgLang;
      this.selectedProgLang[0] = appProgLang;
      // console.log(this.appProgLangs);
    }
    
    // SERVE
    if(this.editApplication.server == null){
      this.serverApp = '';
    }else if(this.editApplication.server.match(',')){
      this.serverApp = this.editApplication.server.split(',');
      for(let i = 0 ; i < this.serverApp.length ; i++){
        this.selectedServer[i] = this.serverApp[i];
      }
      // console.log(this.serverApp);
    }else{
      const server = this.editApplication.server;
      this.serverApp[0] = server;
      this.selectedServer[0] = server;
      // console.log(this.serverApp);
    }
    
    // APP DATABASE
    if(this.editApplication.application_database == null){
      this.appDatabases = '';
    }else if(this.editApplication.application_database.match(',')){
      this.appDatabases = this.editApplication.application_database.split(',');
      for(let i = 0 ; i < this.appDatabases.length ; i++){
        this.selectedDatabase[i] = this.appDatabases[i];
      }
      // console.log(this.appDatabases);
      // console.log(this.selectedDatabase);
      // console.log("test");
    }else{
      const appDatabase = this.editApplication.application_database;
      this.selectedDatabase[0] = appDatabase;
      this.appDatabases[0] = appDatabase;
      // console.log(this.selectedDatabase[0]);
      // console.log(appDatabase);
    }
    
    // APP SERVE
    if(this.editApplication.application_server == null){
      this.appServers = '';
    }else if(this.editApplication.application_server.match(',')){
      this.appServers = this.editApplication.application_server.split(',');
      for(let i = 0 ; i < this.appServers.length ; i++){
        this.selectedAppServer[i] = this.appServers[i];
      }
      // console.log(this.appServers);
    }else{
      const appServer = this.editApplication.application_server;
      this.selectedAppServer[0] = appServer;
      this.appServers[0] = appServer;
      // console.log(this.appServers[0]);
    }
    
    // APP OPR SYS
    if(this.editApplication.application_operating_system == null){
      this.oprSystems = '';
    }else if(this.editApplication.application_operating_system.match(',')){
      this.oprSystems = this.editApplication.application_operating_system.split(',');
      for(let i = 0 ; i < this.oprSystems.length ; i++){
        this.selectedOprSys[i] = this.oprSystems[i];
      }
      // console.log(this.selectedOprSys);
      // console.log(this.oprSystems);
    }else{
      const appOprSys = this.editApplication.application_operating_system;
      this.oprSystems[0] = appOprSys;
      this.selectedOprSys[0] = appOprSys;
      // console.log(this.oprSystems);
    }
  }


  onChangeDevice(event:any){
    let index = this.selectedDevice.indexOf(event.target.value);
    if(index == -1){
      this.selectedDevice.push(event.target.value);
    }else{
      this.selectedDevice.splice(index,1);
    }
    // console.log(this.selectedDevice);
  }

  onChangeType(event:any){
    let index = this.selectedType.indexOf(event.target.value);
    if(index == -1){
      this.selectedType.push(event.target.value);
    }else{
      this.selectedType.splice(index,1);
    }
    // console.log(this.selectedType);
  }
  
  onChangeProgLang(event:any){
    let index = this.selectedProgLang.indexOf(event.target.value);
    console.log(index);
    if(index == -1){
      this.selectedProgLang.push(event.target.value);
    }else{
      this.selectedProgLang.splice(index,1);
    }
    // console.log(this.selectedProgLang);
  }

  onChangeServer(event:any){
    let index = this.selectedServer.indexOf(event.target.value);
    if(index == -1){
      this.selectedServer.push(event.target.value);
    }else{
      this.selectedServer.splice(index,1);
    }
    // console.log(this.selectedServer);
  }

  onChangeDatabase(event:any){
    let index = this.selectedDatabase.indexOf(event.target.value);
    if(index == -1){
        this.selectedDatabase.push(event.target.value);
    }else{
      this.selectedDatabase.splice(index,1);
    }
    // console.log(this.selectedDatabase);
  }

  onChangeAppServer(event:any){
    let index = this.selectedAppServer.indexOf(event.target.value);
    if(index == -1){
      this.selectedAppServer.push(event.target.value);
    }else{
      this.selectedAppServer.splice(index,1);
    }
    // console.log(this.selectedAppServer);
  }
  onChangeOprSys(event:any){
    let index = this.selectedOprSys.indexOf(event.target.value);
    if(index == -1){
      this.selectedOprSys.push(event.target.value);
    }else{
      this.selectedOprSys.splice(index,1);
    }
    // console.log(this.selectedOprSys);
  }

  private addList(){
    this.editApplicationForm.patchValue({
      application_name: this.editApplication.application_name,
      application_short_dsc: this.editApplication.application_short_dsc,
      application_device: this.editApplication.application_device = this.selectedDevice.toString(),
      application_type: this.editApplication.application_type = this.selectedType.toString(), 
      application_programming_language: this.editApplication.application_programming_language = this.selectedProgLang.toString(),
      server: this.editApplication.server = this.selectedServer.toString(),
      application_database: this.editApplication.application_database = this.selectedDatabase.toString(),
      application_server: this.editApplication.application_server = this.selectedAppServer.toString(),
      application_operating_system: this.editApplication.application_operating_system = this.selectedOprSys.toString()
    });
    console.log(this.appName);
  }
  private getProgLangs(){
    this.progLangService.getAllProgLang(this.loginuser.token).subscribe(data => {
      this.progLangs = data;
    })
  }

  private getOprSys(){
    this.oprSysService.getAllOprSys(this.loginuser.token).subscribe(
      data => {
        this.oprSys = data;
      }
    )
  }

  private getServersApp(){
    this.serversAppService.getAllAppServer(this.loginuser.token).subscribe(
      data => {
        this.serversApp = data;
      }
    )  
  }
  
  private getDabases(){
    this.databaseService.getAllDatabase(this.loginuser.token).subscribe(
      data => {
        this.databases = data;
      }
    )
  }

  private getServers(){
    this.serverService.getAllServer(this.loginuser.token).subscribe(
      data => {
        this.servers = data;
      }
    )
  }

  private getTypes(){
    this.typeService.getAllServer(this.loginuser.token).subscribe(
      data => {
        this.types = data;
      }
    )
  }

  onEditApplication(): void{
    if(this.editApplicationForm.invalid){
      return;
    }

    // console.log(this.loginuser.token);
    this.addList();
    this.applicationService.updateApplication(this.editApplication.id, this.editApplicationForm.value, this.loginuser.token).subscribe(
      (response: Application) => {
        this.getApplications();
        console.log(response);
        Swal.fire({
          position: 'center',
            icon: 'success',
            title: 'Berhasil mengupdate Application',
            showConfirmButton: true,
            timer: 1500
        })
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Gagal mengupdate Applications',
          showConfirmButton: true,
          timer: 1500
        })
      });

      this.closeApplicationAdd();
  }

  private getApplications(){
    this.realTimeDataSubscription$ = timer(0, 1000)
      .pipe(switchMap(_ => this.applicationService.getAllApplications(this.loginuser.token)))
      .subscribe(data => {
        this.applications = data;
    });
  }

  public closeApplicationAdd(){
    this.router.navigate(['application']);
  }
}

