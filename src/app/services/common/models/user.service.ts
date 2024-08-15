import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/users/user';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUserResponse } from '../../../contracts/users/createuserresponse';
import { LogInUser } from '../../../entities/users/loginuser';
import { LogInUserResponse } from '../../../contracts/users/loginuserresponse';

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
   const observable: Observable<LogInUserResponse | LogInUser> = this.httpClientService.post<LogInUserResponse | LogInUser>({
      controller: "users",
      action: "LogIn"
    }, logInUser);
   const result = await firstValueFrom(observable) as LogInUserResponse;
   if(callBackFunction)
      callBackFunction();
    return result;
  }
}
