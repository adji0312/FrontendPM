import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { data } from 'jquery';
import { Subscription, switchMap, timer } from 'rxjs';
import { LoginAuthService } from 'src/app/login-auth.service';
import { Role } from 'src/app/role/role';
import { RoleService } from 'src/app/role/role.service';
import Swal from 'sweetalert2';
// import { SearchParamsUser } from '../search-params-user';
import { SearchModelUser, User } from '../user';
import { UserService } from '../user.service';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

// export interface SearchItem {
//   name: string;
// }

export class UserListComponent implements OnInit {

  searchRole!: string;
  searchUserName!: string;
  searchUserId!: string;

  users!: User[];
  roles!: Role[];
  roleDropdown = null;
  selectedRole!: any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 8;

  addUserForm!: FormGroup;
  editUserForm!: FormGroup;

  roleID!: number;

  viewUser: User = new User;
  editUser: User = new User;
  deleteUser: User = new User;

  
  public loginuser: any = {};
  public user: any = {};
  realTimeDataSubscription$!: Subscription;
  

  listUser: Array<User> = [];
  model:SearchModelUser = new SearchModelUser();

  

  private loadData(){
    this.getUsers();
    this.getRoles();
  }

  constructor(private userService: UserService, private roleService: RoleService, private formBuilder: FormBuilder, private authService: LoginAuthService) {

    this.authService.isLoggedIn();
    this.loginuser = JSON.parse(localStorage.getItem('currentUser') as string);
    this.addUserForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.maxLength(10)]],
      user_name: ['', [Validators.required, Validators.maxLength(25)]],
      role: ['', [Validators.required]],
      created_by: ['']
    });

    this.editUserForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.maxLength(10)]],
      user_name: ['', [Validators.required, Validators.maxLength(25)]],
      role: ['', Validators.required],
      modify_by: ['']
    });

  }

  ngOnInit() {
    this.loadData();
    this.userService.getUser(this.loginuser.token).subscribe(user => {
      this.user = user;
      // console.log(user);
    }, err => {
      // console.log(err);
    })

    this.userService.getAllUsers(this.loginuser.token).subscribe((data: any) => {
      this.listUser = data;
      // console.log(data);
    });
  }

  
  clear(){
    this.model.userId = '',
    this.model.user_name = '',
    this.model.role = ''
  }

  get role(){
    return this.editUserForm.get('role') as FormControl;
  }

  private getUsers(){
    this.realTimeDataSubscription$ = timer(0, 1000)
      .pipe(switchMap(_ => this.userService.getAllUsers(this.loginuser.token)))
      .subscribe(data => {
        this.users = data.sort();
    });
  }

  private getRoles(){
    this.roleService.getRoles(this.loginuser.token).subscribe(data => {
      this.roles = data;
    });
  }

  // public alphabeticalOrder(arr){
  //   return arr.sort(function(a, b){
  //     return a === b ? : a > b ? 1 : -1;
  //   });
  // }


  onTableDataChange(event: any){
    this.page = event;
    this.getUsers();
  }

  onAddUser(): void {

    if(this.addUserForm.invalid){
      return;
    }

    this.addUserForm.patchValue({
      created_by: this.loginuser.user.user_id,
    });

    this.userService.addUser(this.addUserForm.value, this.loginuser.token).subscribe(
      (response: User) => {
        this.getUsers();
        // console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Berhasil menambah User',
          showConfirmButton: true,
          timer: 1500
        })
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Gagal menambah User',
          showConfirmButton: true,
          timer: 1500
        })
      }
    );

    document.getElementById('add-user-form')!.click();
    this.addUserForm.reset();
    for (let name in this.addUserForm.controls) {
      this.addUserForm.controls[name].setErrors(null);
    }
  }

  onCloseAddUserModal(){
    this.addUserForm.reset();
  }

  onUpdateUser(): void{

    if(this.editUserForm.invalid){
      return;
    }

    const role_id = this.editUserForm.controls["role"].value;

    this.roleService.findRoleByRoleId(role_id, this.loginuser.token).subscribe(data => {
      this.selectedRole = data;

      this.editUserForm.patchValue({
        role: data,
        modify_by: this.loginuser.user.user_id
      });

      this.userService.updateUser(this.editUser.id, this.editUserForm.value, this.loginuser.token).subscribe(
        (response: User) => {
          this.getUsers();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil mengupdate User',
            showConfirmButton: true,
            timer: 1500
          })
        },
        (error: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Gagal mengupdate User',
            showConfirmButton: true,
            timer: 1500
          })
        });
        
        document.getElementById('edit-user-form')!.click();
        this.editUserForm.reset();
        for (let name in this.editUserForm.controls) {
          this.editUserForm.controls[name].setErrors(null);
        }
      });

  }


  onDeleteUser(id: number): void{
    document.getElementById('delete-user')!.click();
    this.userService.deleteUser(this.deleteUser.id, this.loginuser.token).subscribe(
      (response: void) => {
      this.getUsers();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil menghapus User',
        showConfirmButton: true,
        timer: 1500
      })
    },
    (error: HttpErrorResponse) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Gagal menghapus User',
        showConfirmButton: true,
        timer: 1500
      })
    });
  }

  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
      this.addUserForm.patchValue({
        role: null
      });
    }
    if (mode === 'edit') {
      this.editUser = user;
      this.editUserForm.setValue({
        userId: this.editUser.userId,
        user_name: this.editUser.user_name,
        role: this.editUser.role.role_id,
        modify_by: ''
      });
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'view') {
      this.viewUser = user;
      button.setAttribute('data-target', '#viewUserModal');
    }
    if(mode == 'delete'){
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    container!.appendChild(button);
    button.click();
  }

}
