import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { MessageType, Position, ToastrfyService } from '../../interface-services/user/services/toastrfy.service';
import { UserAuthService } from '../feature-services/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasesComponent, SpinnerType } from '../../../bases/bases.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService extends BasesComponent implements HttpInterceptor {

  constructor(private toastfyService: ToastrfyService, private userAuthService: UserAuthService, spinner: NgxSpinnerService,) {super(spinner) }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side or network error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case HttpStatusCode.BadRequest:
              errorMessage = `Bad Request: ${error.message}`;
              break;
            case HttpStatusCode.Unauthorized:
              errorMessage = `Unauthorized: Please login again.`;
              const refreshToken = localStorage.getItem("refreshToken") ?? '';
              this.userAuthService.refreshTokenLogIn(refreshToken).then(data=>{
              });
              break;
            case HttpStatusCode.NotFound:
              errorMessage = `Not Found: The resource does not exist.`;
              break;
            case HttpStatusCode.InternalServerError:
              errorMessage = `Internal Server Error: Please try again later.`;
              break;
            default:
              errorMessage = `A server-related problem was encountered.`;
              break;
          }
        }
        this.toastfyService.message(errorMessage, "I'm sorry now!", {
          messageType: MessageType.Error,
          position: Position.BottomRight
        });
        this.hideSpinner(SpinnerType.BallScaleMultiple);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
