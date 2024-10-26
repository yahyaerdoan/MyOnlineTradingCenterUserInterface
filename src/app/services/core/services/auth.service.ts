import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private jwtHelper: JwtHelperService) {
    this.identityCheck(); // Initialize the authentication state
  }

  identityCheck(): void {
    const token = localStorage.getItem("accessToken");
    let expired: boolean;

    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    const isAuthenticated = token != null && !expired;
    this._isAuthenticated$.next(isAuthenticated);
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated$.getValue();
  }

  get isAuthenticated$() {
    return this._isAuthenticated$.asObservable();
  }

  logOut(): void {
    localStorage.removeItem("accessToken");    
    this._isAuthenticated$.next(false); // Update authentication state to false
  }
}