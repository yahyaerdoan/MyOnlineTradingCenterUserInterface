import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageType, Position, ToastrfyService } from '../../services/features/user/services/toastrfy.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../bases/bases.component';
import { _isAuthenticated, AuthService } from '../../services/core/services/auth.service';



export const authenticationGuard: CanActivateFn = (route, state) => {
  
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  const toastfyService = inject(ToastrfyService);
  const spinnerService = inject(NgxSpinnerService);

  spinnerService.show(SpinnerType.BallScaleMultiple);

  //#region this is working from auth service 
  /*   const token = localStorage.getItem("accessToken");
  let expired: boolean;
  try {
    expired = jwtHelper.isTokenExpired(token);

  } catch {
    expired = true
  } */
  /*   !token || expired */

  //#endregion

  if (!_isAuthenticated) {
    router.navigate(["logins"], { queryParams: { returnUrl: state.url } });
    toastfyService.message("You need to log in first!", "Unauthorized Entry!", {
      messageType: MessageType.Warning,
      position: Position.TopRight
    })
  }
  spinnerService.hide(SpinnerType.BallScaleMultiple);
  return true;
};
