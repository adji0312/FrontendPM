import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectPIC } from 'src/app/projectPIC/projectPIC';
import { environment } from 'src/environments/environment';
import { Status } from './status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  private baseUrl = `${environment.baseUrl}/status`;

  public getStatus(token: any): Observable<any>{
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get<Status[]>(`${this.baseUrl}/all`, {headers: headers});
  }
}
