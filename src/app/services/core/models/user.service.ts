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
}
