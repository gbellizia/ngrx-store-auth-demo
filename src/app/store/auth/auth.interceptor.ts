import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, first, flatMap, mergeMap, tap } from 'rxjs/operators';
import { AuthState, authFeatureName } from './auth.reducer';
import { select, Store } from '@ngrx/store';
import { getToken, logout } from 'src/app/store';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private secureRoutes = [environment.appConfig.apiUrl];

  constructor(private store: Store<AuthState>) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.secureRoutes.find((x) => req.url.startsWith(x))) {
      return next.handle(req);
    }
    return this.store.select(getToken).pipe(
      first(),
      mergeMap(token => {
        const authReq = !!token ? req.clone({
          setHeaders: { Authorization: 'Bearer ' + token },
        }) : req;
        return next.handle(authReq);
      }),
    );
  }

}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store<any>) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 401 || err.status === 403) {
            // TOKEN SCADUTO!
            this.store.dispatch(logout());
          }

          // return the error back to the caller
          return throwError(() => err);

        }
        return throwError(() => err);
      }),
      finalize(() => {
        // any cleanup or final activities
      })
    );
  }
}