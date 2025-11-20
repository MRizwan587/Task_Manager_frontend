import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`; 
        } else {
          // Server-side error
          switch (error.status) {
            case 401:
              // Unauthorized - logout and redirect to login
              this.authService.logout();
              errorMessage = error.error?.message || 'Unauthorized. Please login again.';
              break;
            case 403:
              errorMessage = error.error?.message || 'You do not have permission to access this resource.';
              break;
            case 404:
              errorMessage = error.error?.message || 'Resource not found.';
              break;
            case 500:
              errorMessage = error.error?.message || 'Server error. Please try again later.';
              break;
            default:
              errorMessage = error.error?.message || `Error: ${error.status} ${error.statusText}`;
          }
        }

        // You can add a toast/notification service here to show error messages
        console.error('HTTP Error:', errorMessage);
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
