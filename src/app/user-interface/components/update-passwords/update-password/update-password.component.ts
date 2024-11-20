import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageType, Position, ToastrfyService } from '../../../../services/interface-services/user/services/toastrfy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/core-services/feature-services/user.service';
import { UserAuthService } from '../../../../services/core-services/feature-services/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { UpdatePasswordRequest } from '../../../../contracts/Auth/requests/update-password-request.model';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent extends BasesComponent {
  constructor(private formBuilder: FormBuilder, private userAuthService: UserAuthService, private userService: UserService,
    private toastifyService: ToastrfyService, private router: Router, private spinnerService: NgxSpinnerService,
    private activatedRouteService: ActivatedRoute) { super(spinnerService) }

  formGroup!: FormGroup;
  submitted: boolean = false;
  verifyResetTokenState: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
    this.verifyResetToken();
  }

  initializeForm(): void {
    this.formGroup = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.maxLength(25)]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: mustMatch('password', 'confirmPassword') }
    );
  };

  get validate() {
    return this.formGroup.controls;
  }

  updatePassword(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    };

    this.showSpinner(SpinnerType.BallScaleMultiple);

    this.activatedRouteService.params.subscribe((params) => {

      const userId: string = params['userId'];
      const resetToken: string = params['resetToken'];

      const updatePasswordRequest: UpdatePasswordRequest = {
        updatePasswordDto: {
          userId,
          resetToken,
          email: this.formGroup.get('email')?.value,
          password: this.formGroup.get('password')?.value,
          confirmPassword: this.formGroup.get('confirmPassword')?.value
        }
      };

      this.userAuthService.updatepassword(updatePasswordRequest, (successMessage) => {
        this.hideSpinner(SpinnerType.BallScaleMultiple);
        this.toastifyService.message(successMessage || 'Password updated successfully', 'Success', {
          messageType: MessageType.Success,
          position: Position.TopRight
        }
        );
      }, (errorMessage) => {
        this.hideSpinner(SpinnerType.BallScaleMultiple);
        this.toastifyService.message(errorMessage || 'Failed to update password.', 'Error', {
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      });
    });
  };


  verifyResetToken() {
    this.spinnerService.show(SpinnerType.BallScaleMultiple);
    this.activatedRouteService.params.subscribe({
      next: async params => {
        const resetToken: string = params["resetToken"];
        const userId: string = params["userId"];

        this.verifyResetTokenState = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.spinnerService.hide(SpinnerType.BallScaleMultiple);
        });
      }
    });
  };
}
export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {

  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ mustMatch: true });
    } else {
      matchingControl?.setErrors(null);
    }

    return null;
  };
}