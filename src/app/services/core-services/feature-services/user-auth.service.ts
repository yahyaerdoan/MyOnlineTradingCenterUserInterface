import { Injectable } from '@angular/core';
import { HttpClientService } from '../general-services/http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { LogInUser } from '../../../entities/users/loginuser';
import { SocialUser } from '@abacritt/angularx-social-login';
import { FunctionResponse } from '../../../contracts/responses/functionResponse';
import { TokenResponse } from '../../../contracts/responses/tokenResponse';
import { UpdatePasswordRequest } from '../../../contracts/Auth/requests/update-password-request.model';
import { UpdatePasswordResponse } from '../../../contracts/Auth/responses/update-password-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService) { }

  async logIn(logInUser: LogInUser, callBackFunction?: () => void): Promise<FunctionResponse<TokenResponse>> {
    const observable: Observable<FunctionResponse<TokenResponse> | LogInUser> = this.httpClientService.post<FunctionResponse<TokenResponse> | LogInUser>({
      controller: "auths",
      action: "logIn"
    }, logInUser);
    const result = await firstValueFrom(observable) as FunctionResponse<TokenResponse>;
    if (result.isSuccessful && result.data?.token.accessToken && result.data.token.refreshToken) {
      localStorage.setItem("accessToken", result.data.token.accessToken);
      localStorage.setItem("refreshToken", result.data.token.refreshToken);
    }
    if (callBackFunction)
      callBackFunction();
    return result;
  };

  async logInWithGoogle(socialUser: SocialUser, callBackFunction?: () => void): Promise<FunctionResponse<TokenResponse>> {
    const observable: Observable<FunctionResponse<TokenResponse> | SocialUser> = this.httpClientService.post<FunctionResponse<TokenResponse> | SocialUser>({
      controller: "auths",
      action: "googleLogIn"
    }, socialUser);
    const result = await firstValueFrom(observable) as FunctionResponse<TokenResponse>;
    debugger;

    if (result.isSuccessful && result.data?.token.accessToken && result.data.token.refreshToken) {
      localStorage.setItem("accessToken", result.data.token.accessToken);
      localStorage.setItem("refreshToken", result.data.token.refreshToken);
    }
    if (callBackFunction)
      callBackFunction();
    return result;
  };

  async refreshTokenLogIn(refreshToken: string, callBackFunction?: () => void): Promise<FunctionResponse<TokenResponse>> {
    const observable: Observable<FunctionResponse<TokenResponse> | any> = this.httpClientService.post<FunctionResponse<TokenResponse> | any>({
      action: "RefreshTokenLogIn",
      controller: "auths"
    }, { refreshToken });
    const result = await firstValueFrom(observable) as FunctionResponse<TokenResponse>;
    if (result.isSuccessful && result.data?.token.accessToken && result.data.token.refreshToken) {
      localStorage.setItem("accessToken", result.data.token.accessToken);
      localStorage.setItem("refreshToken", result.data.token.refreshToken);
    }
    if (callBackFunction)
      callBackFunction();
    return result;
  };

  async resetPassword(email: string, callBackFunction?: () => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'auths',
      action: 'resetpassword'
    }, email);
    await firstValueFrom(observable);
    if (callBackFunction)
      callBackFunction();
    return observable;
  };

  async verifyResetToken(resetToken: string, userId: string, callBackFunction?: () => void) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'auths',
        action: 'verifyresettoken'
      },
      { userId, resetToken }
    );

    const verifyResetTokenState: boolean = await firstValueFrom(observable);

    if (callBackFunction)
      callBackFunction();

    return verifyResetTokenState;
  };

  async updatepassword(
    updatePasswordRequest: UpdatePasswordRequest,
    successCallback?: (message?: string) => void, errorCallback?: (errorMessage?: string) => void
  ): Promise<UpdatePasswordResponse> {
    const observable: Observable<UpdatePasswordResponse | UpdatePasswordRequest> = this.httpClientService.post<UpdatePasswordResponse | UpdatePasswordRequest>({
      controller: 'auths',
      action: 'updatepassword'
    }, updatePasswordRequest);
    const result = await firstValueFrom(observable) as  UpdatePasswordResponse
    if (result.isSuccessful) {
      successCallback?.(result.statusMessage);
    } else {

       const errorMessage = this.formatValidationErrors() || result.statusMessage || 'An unexpected error occurred.';
    errorCallback?.(errorMessage);
    }  
    return result;
  };private formatValidationErrors(errors?: { [key: string]: string[] }): string {
    if (!errors) {
      return '';
    }
    return Object.entries(errors)
      .map(([field, messages]) => `${field}: ${messages.join('. ')}`)
      .join('. ');
  }
  

}