import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../shared/models/user';
import { AppConfigService } from '../../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appConfig: AppConfigService = environment.appConfig;

  constructor(private http: HttpClient) {}
 
  login(email: string, password: string): Observable<any> {
    const url = `${this.appConfig.apiUrl}/authenticate`;
    //return this.http.post<User>(url, {email, password});
    return this.http.get<User>(url)

  }

}
