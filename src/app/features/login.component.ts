import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@shared/models/user'

import { Store, select } from '@ngrx/store';
import { checkAuth,  login, selectIsAuthenticated, logout } from 'src/app/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  isAuthenticated$: Observable<boolean> = this.store.pipe(select(selectIsAuthenticated));
  
  user: User = new User();
  
  errorMessage: string = "";
  constructor(private store: Store<any>) { }

  ngOnInit() {}
  onSubmit(): void {
    const actionPayload = {
      email: this.user.email || "",
      password: this.user.password || ""
    };
    this.store.dispatch(login(actionPayload));
  }

  logout(){
    this.store.dispatch(logout());
  }

}
