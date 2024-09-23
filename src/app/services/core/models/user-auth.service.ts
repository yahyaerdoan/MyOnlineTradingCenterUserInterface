import { Injectable } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { LogInUser } from '../../../entities/users/loginuser';
import { LogInUserResponse } from '../../../contracts/users/loginuserresponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService) { }
  async logIn(logInUser: LogInUser, callBackFunction?: ()=> void): Promise<LogInUserResponse>{
    const observable: Observable<LogInUserResponse | LogInUser > = this.httpClientService.post<LogInUserResponse | LogInUser>({
       controller: "auths",
       action: "logIn"
     }, logInUser);
    const result = await firstValueFrom(observable) as LogInUserResponse;
    if(result?.isSuccessful && result?.data && result.data?.token?.accessToken && result.data.token.expiration){
      localStorage.setItem("accessToken", result.data.token.accessToken);
      localStorage.setItem("refreshToken", result.data.token.refreshToken);
    }       
    if(callBackFunction)
       callBackFunction();
     return result;
   }
 
   async logInWithGoogle(socialUser: SocialUser, callBackFunction?: ()=> void): Promise<LogInUserResponse>{
    const observable: Observable<LogInUserResponse | SocialUser> = this.httpClientService.post<LogInUserResponse | SocialUser>({
       controller: "auths",
       action: "googleLogIn"
     }, socialUser);
     const result = await firstValueFrom(observable) as LogInUserResponse;
     if(result.isSuccessful && result.data && result.data.token.accessToken && result.data.token.expiration){
      localStorage.setItem("accessToken",  result.data.token.accessToken);
      localStorage.setItem("refreshToken",  result.data.token.refreshToken);
     }
    if(callBackFunction)
       callBackFunction();
     return result;
   }

   async refreshTokenLogIn(refreshToken: string, callBackFunction?: ()=> void): Promise<LogInUserResponse>{
    const observable: Observable<LogInUserResponse | any> = this.httpClientService.post<LogInUserResponse | any>({
      action: "RefreshTokenLogIn",
      controller: "auths"
    }, {refreshToken});
    const result = await firstValueFrom(observable) as LogInUserResponse;
    if(result?.isSuccessful && result?.data && result.data?.token?.accessToken && result.data.token.expiration){
      localStorage.setItem("accessToken", result.data.token.accessToken);
      localStorage.setItem("refreshToken", result.data.token.refreshToken);
    } 
    if(callBackFunction)
      callBackFunction();
    return result;
  }
   
}
