import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import * as fromAuthActions from './auth.actions';
import { Router } from '@angular/router';
import { from, of, pipe } from 'rxjs';
import { AuthService } from './auth.service';
import jwt_decode  from 'jwt-decode';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.login),
        switchMap((payload) => this.authService.login(payload.email, payload.password)
          .pipe(
            tap((resp)=> {
              if (resp){ 
                this.router.navigate(['/']);
              }
            }),
            map((resp) => {
              //const payload: any = jwt_decode(resp.token); 
              return fromAuthActions.loginComplete({
                isLoggedIn: true,
                token: resp.token,
                profile: resp.profile
              })
            })
          )
        )
      )
  );

   logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.logout),
      map(() => fromAuthActions.logoutComplete())
    )
  );

  logoutComplete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logoutComplete),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}