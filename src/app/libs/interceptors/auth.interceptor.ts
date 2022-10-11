import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import StorageHerlper from '../helpers/storage.helper';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private api: ApiService, private data: DataService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //console.log('<<', request);
    if (request.url.includes('/mirror/')) {
      let originalRequest = request
      request = request.clone(
        {
          setHeaders: {
            Authorization: 'Beader ' + StorageHerlper.getItem('session').token
          }
        }
      )
      return next.handle(request).pipe(
        catchError( (err:any) => {
          console.log('>>',err);
          if (err instanceof HttpErrorResponse && err.status === 401) {
            console.log('inError');
            return this.expiredHandler(originalRequest, next)
          }
          return throwError(() => err)
        })
      )
    }
    return next.handle(request)
  }

  private expiredHandler(originalRequest: HttpRequest<unknown>, next: HttpHandler ){
    return this.api.refreshToken().pipe(
      switchMap( (resp) => {
        StorageHerlper.setItem('session', resp)
        originalRequest = originalRequest.clone(
          {
            setHeaders: {
              Authorization: 'Beader ' + StorageHerlper.getItem('session').token
            }
          }
        )
        return next.handle(originalRequest)
      })
    )
  }

}
