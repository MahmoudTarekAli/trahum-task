import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../modules/authentication/services/auth.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl(`/auth`);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
    }
    return throwError(err);
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ignore =
      typeof request.body === 'undefined' ||
      request.body === null ||
      request.body.toString() === '[object FormData]' || // <-- This solves your problem
      request.headers.has('Content-Type');
    if (ignore) {
      request = request.clone({
        setHeaders: {
          'Accept-Language': '*',
          Authorization: `${this.authService.getToken()}`,
          'x-api-key': 'XYSVDVSVSDCX2VD5533VPPTIOIOPQWDEMNI8876110Z'
        },
      });
      return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
    }

    request = request.clone({
      setHeaders: {
        'Accept-Language': '*',
        'Content-Type': 'application/json',
        Authorization: `${this.authService.getToken()}`,
        'x-api-key': 'XYSVDVSVSDCX2VD5533VPPTIOIOPQWDEMNI8876110Z'

      },
    });

    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }
}
