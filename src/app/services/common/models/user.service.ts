import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/users/user';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUserResponse } from '../../../contracts/users/createuserresponse';

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
