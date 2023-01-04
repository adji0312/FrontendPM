import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient ) { 
    this.http = http;
  }

  private baseUrl = `${environment.baseUrl}/user`;

  addUser(user: User, token: any): Observable<User> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.post<User>(`${this.baseUrl}/add`, user, {headers: headers});
  }

  getUser(token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get(`${this.baseUrl}/getuser`, {headers: headers});
  }

  getAllUsers(token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get(`${this.baseUrl}/all`, {headers: headers});
  }

  getUserByRole(role: string, token: any):Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get(`${this.baseUrl}/getByRole/${role}`, {headers: headers});
  }

  updateUser(id:number, user: User, token: any): Observable<User>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.put<User>(`${this.baseUrl}/update/${id}`, user, {headers: headers});
  }

  deleteUser(id: number, token: any): Observable<void>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {headers: headers});
  }

  public loginUser(user: any): Observable<any>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    return this.http.post("http://localhost:8080/login", user, {headers: headers});
  }
}
