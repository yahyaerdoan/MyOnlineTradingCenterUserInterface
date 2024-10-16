import { Injectable } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { LogInUser } from '../../../entities/users/loginuser';
import { SocialUser } from '@abacritt/angularx-social-login';
import { FunctionResponse } from '../../../contracts/responses/functionResponse';
import { TokenResponse } from '../../../contracts/responses/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService) { }
  async logIn(logInUser: LogInUser, callBackFunction?: ()=> void): Promise<FunctionResponse<TokenResponse>>{
    const observable: Observable<FunctionResponse<TokenResponse> | LogInUser > = this.httpClientService.post<FunctionResponse<TokenResponse> | LogInUser>({
       controller: "auths",
       action: "logIn"
     }, logInUser);
    const result = await firstValueFrom(observable) as FunctionResponse<TokenResponse>;
    if(result.isSuccessful && result.data?.token.accessToken && result.data.token.refreshToken){
      localStorage.setItem("accessToken", result.data.token.accessToken);
      localStorage.setItem("refreshToken", result.data.token.refreshToken);
    }       
    if(callBackFunction)
       callBackFunction();
     return result;
   }
 
   async logInWithGoogle(socialUser: SocialUser, callBackFunction?: ()=> void): Promise<FunctionResponse<TokenResponse>>{
    const observable: Observable<FunctionResponse<TokenResponse> | SocialUser> = this.httpClientService.post<FunctionResponse<TokenResponse> | SocialUser>({
       controller: "auths",
       action: "googleLogIn"
     }, socialUser);
     const result = await firstValueFrom(observable) as FunctionResponse<TokenResponse>;
     debugger;    

     if(result.isSuccessful && result.data?.token.accessToken && result.data.token.refreshToken){
      localStorage.setItem("accessToken",  result.data.token.accessToken);
      localStorage.setItem("refreshToken",  result.data.token.refreshToken);
     }
    if(callBackFunction)
       callBackFunction();
     return result;
   }

   async refreshTokenLogIn(refreshToken: string, callBackFunction?: ()=> void): Promise<FunctionResponse<TokenResponse>>{
    const observable: Observable<FunctionResponse<TokenResponse> | any> = this.httpClientService.post<FunctionResponse<TokenResponse> | any>({
      action: "RefreshTokenLogIn",
      controller: "auths"
    }, {refreshToken});
    const result = await firstValueFrom(observable) as FunctionResponse<TokenResponse>;
    if(result.isSuccessful && result.data?.token.accessToken && result.data.token.refreshToken){
      localStorage.setItem("accessToken", result.data.token.accessToken);
      localStorage.setItem("refreshToken", result.data.token.refreshToken);
    } 
    if(callBackFunction)
      callBackFunction();
    return result;
  }
   
}
