import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
   param:any

  private apiUrl = `http://localhost:8080/users`;

  constructor(private http: HttpClient) { }

  getData(param: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${param}`);
  }

  postData(param: string,value:any): Observable<any> {
    return this.http.get(`${this.apiUrl}${param}${value}`);
  }
  
  }