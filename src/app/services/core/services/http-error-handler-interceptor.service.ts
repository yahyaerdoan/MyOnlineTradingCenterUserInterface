import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { MessageType, Position, ToastrfyService } from '../../features/user/services/toastrfy.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastfyService: ToastrfyService) { }
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
              break;
            case HttpStatusCode.NotFound:
              errorMessage = `Not Found: The resource does not exist.`;
              break;
            case HttpStatusCode.InternalServerError:
              errorMessage = `Internal Server Error: Please try again later.`;
              break;
            default:
              errorMessage = `Unknown Error: ${error.message}`;
              break;
          }
        }
        this.toastfyService.message(errorMessage, "Error!", {
          messageType: MessageType.Error,
          position: Position.BottomRight
        });
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
