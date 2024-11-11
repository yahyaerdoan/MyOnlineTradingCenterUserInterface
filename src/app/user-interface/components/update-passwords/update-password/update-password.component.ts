import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageType, Position, ToastrfyService } from '../../../../services/interface-services/user/services/toastrfy.service';
import { FunctionResponse } from '../../../../contracts/responses/functionResponse';
import { CreateUser } from '../../../../entities/users/createuser';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/core-services/feature-services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {
  constructor(private formBuilder: FormBuilder, private userService: UserService, 
    private toastifyService: ToastrfyService, private router: Router){}

  formGroup!: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.formGroup = this.formBuilder.group({     
      email: ["", [Validators.required, Validators.maxLength(25), Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    }, {
      validator: mustMatch('password', 'confirmPassword')
    });
  }

  get validate(){
    return this.formGroup.controls;
  }

  async onSubmit(createUser: CreateUser){
    this.submitted = true;
    if(this.formGroup.invalid)
      return;
    const result: FunctionResponse<null> =  await this.userService.create(createUser);
    if (result.isSuccessful) {
      const successMessage = `${result.message} You will be redirected to the login page, please log in.`;
      this.toastifyService.message(successMessage, "Success!", {
        messageType: MessageType.Success,
        position: Position.TopRight
      });

    setTimeout(() => {
      this.router.navigate(["/logins"]);
    }, 1500);
    }else{
      const errorMessage = result.errors ? result.errors.join(',') : 'An unknown error occured.'
      this.toastifyService.message(errorMessage, "Error!", {
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
  }

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