import { UpperCasePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginAuthService } from '../login-auth.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  loginForm!: FormGroup;
  

  constructor(
    private userService: UserService, 
    private router: Router, 
    private authService: LoginAuthService, 
    private formBuilder : FormBuilder, 
    private toastr: ToastrService,
    private http: HttpClient) {

    this.authService.isLoggedIn();
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      password: ['', Validators.required],
    })
  }

  loginUser(user: any){
    const url = 'http://bnos-be-api-bnos.apps.ocpdev.dti.co.id/login';
    // const userId = user.user_id.toLowerCase();
    // console.log(user);
    this.http.post(url, user, httpOptions).subscribe((a) => {
      if(a){
        console.log(a);
        console.log(user);
        this.userService.loginUser(user).subscribe((response) => {
          if(response){
            console.log(response);
            console.log(user);
            if(response.token){
              // console.log(response);
              localStorage.setItem('currentUser', JSON.stringify(response));
              this.router.navigate(['/dashboard']);
              this.toastr.success('You are success login', 'Login - Success');
    
              const jwtToken = JSON.parse(atob(response.token.split('.')[1]));
              const expires = new Date(jwtToken.exp * 1000);
              const timeout = expires.getTime() - Date.now();
    
              setTimeout(() => this.authService.logout(), timeout);
            }
          }
        }, (error) => {
          // console.log(error);
          this.toastr.error('Invalid Username or Password!', 'Login - Failed');
        })
      }
    }, (error) => {
      // console.log(error);
      this.toastr.error('User not registered', 'Login - Failed');
    });
    // console.log(user.user_id);
    // console.log(this.http.post(user, url));
    
  }

}
