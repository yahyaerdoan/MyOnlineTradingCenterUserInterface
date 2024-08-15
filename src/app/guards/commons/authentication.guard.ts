import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageType, Position, ToastrfyService } from '../../services/user-i/toastrfy.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../bases/bases.component';



export const authenticationGuard: CanActivateFn = (route, state) => {
  
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  const toastfyService = inject(ToastrfyService);
  const spinnerService = inject(NgxSpinnerService);

  spinnerService.show(SpinnerType.BallScaleMultiple);
  const token = localStorage.getItem("accessToken");
  let expired: boolean;
  try {
    expired = jwtHelper.isTokenExpired(token);

  } catch {
    expired = true
  }
  if (!token || expired) {
    router.navigate(["logins"], { queryParams: { returnUrl: state.url } });
    toastfyService.message("You need to log in first!", "Unauthorized Entry!", {
      messageType: MessageType.Warning,
      position: Position.TopRight
    })
  }
  spinnerService.hide(SpinnerType.BallScaleMultiple);
  return true;
};
