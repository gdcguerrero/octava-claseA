import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError, tap } from 'rxjs';
import { concatMap, map, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private api: ApiService, private data: DataService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('<<', request);
    if (request.url.includes('/mirror/')) {
      return next.handle(request).pipe(
        concatMap(
          (respOriginal) => {
            //console.log('concat ',respOriginal)
            if (respOriginal instanceof HttpResponse) {
              return this.api.check().pipe(
                catchError(err => {
                  //console.log(err);
                  if (err.status === 403) {
                    return throwError(() => err)
                  }
                  return of(err)
                }),
                map(
                  () => respOriginal
                )
              )
            }
            return of(respOriginal)
          }
        ),
        catchError(err => {
          if (err.status === 403) {
            return this.api.refreshToken()
            // .pipe(
            //   concatMap((resp: any) => {
            //     this.data.session$.next(
            //       {
            //         username: this.api.getSession('user'),
            //         token: resp.token
            //       }
            //     )
            //     return this.api.searchPokemon('ditto').pipe(
            //       concatMap( res => {
            //         return throwError(() => res)
            //       })
            //     )
            //   })
            // )
          }
          return of(err)
        }),
      )
      if (request.url.includes('/refresh')) {
        return next.handle(request).pipe(
          tap((resp:any) => {
            this.data.session$.next(
              {
                username: this.api.getSession('user'),
                token: resp.token
              }
            )
          }),
          concatMap((res: any) => {
            return this.api.searchPokemon('ditto')
          })
        )
      }
    }
    return next.handle(request)
  }
}
