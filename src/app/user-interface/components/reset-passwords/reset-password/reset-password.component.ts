import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/core-services/feature-services/user.service';
import { MessageType, Position, ToastrfyService } from '../../../../services/interface-services/user/services/toastrfy.service';
import { Router } from '@angular/router';
import { CreateUser } from '../../../../entities/users/createuser';
import { FunctionResponse } from '../../../../contracts/responses/functionResponse';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
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