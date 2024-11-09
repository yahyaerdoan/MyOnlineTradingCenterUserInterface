import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageType, Position, ToastrfyService } from '../../services/interface-services/user/services/toastrfy.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../bases/bases.component';
import {  AuthService } from '../../services/core-services/general-services/auth.service';



export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastfyService = inject(ToastrfyService);
  const spinnerService = inject(NgxSpinnerService);
  const authService = inject(AuthService);

  spinnerService.show(SpinnerType.BallScaleMultiple);

  // Check if the user is authenticated
  if (!authService.isAuthenticated) {
    router.navigate(["logins"], { queryParams: { returnUrl: state.url } });
    toastfyService.message("You need to log in first!", "Unauthorized Entry!", {
      messageType: MessageType.Warning,
      position: Position.TopRight
    });
    spinnerService.hide(SpinnerType.BallScaleMultiple);
    return false; // Prevent access
  }

  spinnerService.hide(SpinnerType.BallScaleMultiple);
  return true; // Allow access
};
