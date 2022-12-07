import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BacklogDevDetailComponent } from './backlogDev/backlog-dev-detail/backlog-dev-detail.component';
import { BacklogDevEditComponent } from './backlogDev/backlog-dev-edit/backlog-dev-edit.component';
import { BacklogDevelopmentComponent } from './backlogDev/backlog-development/backlog-development.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectTypeComponent } from './projectType/project-type/project-type.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {path: "", redirectTo:"login", pathMatch:"full"},
  {path: "login", component:LoginComponent},
  {path: "role", component:RoleListComponent, canActivate: [AuthGuard]},
  {path: "user", component:UserListComponent, canActivate: [AuthGuard]},
  {path: "dashboard", component:DashboardComponent, canActivate: [AuthGuard]},
  {path: "projectType", component:ProjectTypeComponent, canActivate: [AuthGuard]},
  {path: "project", component:ProjectListComponent, canActivate: [AuthGuard]},
  {path: "backlogDevelopment", component:BacklogDevelopmentComponent, canActivate: [AuthGuard]},
  {path: "backlogDevDetail", component:BacklogDevDetailComponent, canActivate: [AuthGuard]},
  {path: "backlogDevEdit", component:BacklogDevEditComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
