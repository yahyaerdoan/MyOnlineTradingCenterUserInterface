import { Injectable } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { CreateUser } from '../../../entities/users/createuser';
import { firstValueFrom, Observable } from 'rxjs';
import { FunctionResponse } from '../../../contracts/responses/functionResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(createUser: CreateUser): Promise<FunctionResponse<null>>{
   const observable: Observable<FunctionResponse<null> | CreateUser> = this.httpClientService.post<FunctionResponse<null> | CreateUser>({
      controller: "users"
    }, createUser);
    return await firstValueFrom(observable) as FunctionResponse<null>;
  }
}
