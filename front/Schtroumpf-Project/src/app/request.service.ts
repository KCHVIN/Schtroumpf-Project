import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
  })
};

export interface Schtroumpf {
  _id: number;
  name:string
  age: number;
  family: string;
  race: string;
  food: string;
  friends: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  routeLocal  = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  get(routeName: string) {
    return this.http.get<any[]>(this.routeLocal + routeName, httpOptions)
  }

  post(routeName: string, body) {
    return this.http.post(this.routeLocal + routeName, body,  httpOptions);
  }

  put(routeName: string, body)
  {
    return this.http.put(this.routeLocal + routeName, body,  httpOptions);
  }

  delete(routeName: string)
  {
    return this.http.delete(this.routeLocal + routeName,  { responseType: 'text' });
  }

  isSigned(): boolean {
    if (sessionStorage.getItem('token') == undefined) {
      return false
    } else {
      return true
    }
  }

  transformBodyToHttpParam(body): HttpParams
  {
    let httpParams = new HttpParams();

    Object.keys(body).forEach(function (key) {
        httpParams = httpParams.append(key, body[key]);
    });
    return httpParams;
  }
}
