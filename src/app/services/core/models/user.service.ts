import { Injectable } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { User } from '../../../entities/users/user';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUserResponse } from '../../../contracts/users/createuserresponse';
import { LogInUser } from '../../../entities/users/loginuser';
import { LogInUserResponse } from '../../../contracts/users/loginuserresponse';
import { TokenResponse } from '../../../contracts/tokens/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: User): Promise<CreateUserResponse>{
   const observable: Observable<CreateUserResponse | User> = this.httpClientService.post<CreateUserResponse | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as CreateUserResponse;
  }

 async logIn(logInUser: LogInUser, callBackFunction?: ()=> void): Promise<LogInUserResponse>{
   const observable: Observable<LogInUserResponse | LogInUser | TokenResponse> = this.httpClientService.post<LogInUserResponse | LogInUser | TokenResponse>({
      controller: "users",
      action: "login"
    }, logInUser);
   const result = await firstValueFrom(observable) as LogInUserResponse & TokenResponse;
   if(result.token.expiration)
      localStorage.setItem("accessToken", result.token.accessToken);
   if(callBackFunction)
      callBackFunction();
    return result;
  }

  async logInWithGoogle(user: SocialUser, callBackFunction?: ()=> void): Promise<any>{
   const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller: "users",
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
