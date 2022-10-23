import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthState } from './auth.reducer';
import { selectIsAuthenticated } from './auth.selector';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public router: Router,
    public auth: AuthService,
    private store: Store<AuthState>
  ) { }

  canActivate(): boolean | Observable<boolean> {

    return this.store.select(selectIsAuthenticated).pipe(map((authenticated) => {
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return false;
      }
      return true
    }))

  }
}
