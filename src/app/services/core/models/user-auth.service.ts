import { Injectable } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { LogInUser } from '../../../entities/users/loginuser';
import { LogInUserResponse } from '../../../contracts/users/loginuserresponse';
import { TokenResponse } from '../../../contracts/tokens/tokenResponse';
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
    if(result.isSuccessful && result.data && result.data.token && result.data.token.expiration)
       localStorage.setItem("accessToken", result.data.token.accessToken);
      debugger;
    if(callBackFunction)
       callBackFunction();
     return result;
   }
 
   async logInWithGoogle(user: SocialUser, callBackFunction?: ()=> void): Promise<any>{
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
       controller: "auths",
       action: "googleLogIn"
     }, user);
     const result = await firstValueFrom(observable) as TokenResponse;
     if(result.token)
       localStorage.setItem("accessToken", result.token.accessToken);
    if(callBackFunction)
       callBackFunction();
     return result;
   }
}
