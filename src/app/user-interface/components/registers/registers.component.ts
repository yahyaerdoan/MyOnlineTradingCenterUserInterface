import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../../entities/users/user';
import { UserService } from '../../../services/core/models/user.service';
import { MessageType, Position, ToastrfyService } from '../../../services/features/user/services/toastrfy.service';
import { CreateUserResponse } from '../../../contracts/users/createuserresponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.scss'
})
export class RegistersComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, 
    private toastifyService: ToastrfyService, private router: Router){}

  formGroup!: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.formGroup = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
      userName: ["", [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
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

  async onSubmit(user: User){
    this.submitted = true;
    if(this.formGroup.invalid)
      return;
    const result: CreateUserResponse =  await this.userService.create(user);
    if (result.isSuccessful) {
      this.toastifyService.message(result.message, "Success!", {
        messageType: MessageType.Success,
        position: Position.TopRight});
      this.router.navigate(["/logIns"])
    }else{
      this.toastifyService.message(result.errors, "Error!", {
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