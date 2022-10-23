import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
// import { AppConfigService } from '../app-config.service';

export interface JsonRpc {
  Action: string;
  Service: string;
  Params: { [key: string]: any };
}
export class AppConfigService {
  public apiUrl: string="";
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  appConfig: AppConfigService = environment.appConfig;
  constructor(private http: HttpClient) { }
  public post(action: string, params?: { [key: string]: any }): Observable<any> {
    const url = `${this.appConfig.apiUrl}/${action}`;
    return this.http.post(url, params)
  }
  public get(action: string, params?:any): Observable<any> {
    const url = `${this.appConfig.apiUrl}/${action}`;
    return this.http.get(url, {params: params})
  }



}
