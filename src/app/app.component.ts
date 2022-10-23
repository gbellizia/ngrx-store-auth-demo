import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { checkAuth,  login, selectIsAuthenticated, selectUserInfo, logout } from './store' ;
import { Profile } from '@shared/models/profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-store - auth demo';
  isAuthenticated$: Observable<boolean> = this.store.pipe(select(selectIsAuthenticated));
  selectUserInfo$: Observable<Profile | null> = this.store.pipe(select(selectUserInfo));
  constructor(private store: Store<any>) { }
  logout(){
    this.store.dispatch(logout());
  }
}
