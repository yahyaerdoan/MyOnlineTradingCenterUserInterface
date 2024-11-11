import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/core-services/feature-services/user.service';
import { MessageType, Position, ToastrfyService } from '../../../../services/interface-services/user/services/toastrfy.service';
import { Router } from '@angular/router';
import { CreateUser } from '../../../../entities/users/createuser';
import { FunctionResponse } from '../../../../contracts/responses/functionResponse';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../../services/core-services/general-services/auth.service';
import { UserAuthService } from '../../../../services/core-services/feature-services/user-auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent extends BasesComponent {
  constructor(private formBuilder: FormBuilder, private userAuthService: UserAuthService, 
    private toastifyService: ToastrfyService, private router: Router, 
    private spinnerService: NgxSpinnerService){ super(spinnerService) }

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

  async resetPassword(email: string){
    this.submitted = true;
    if(this.formGroup.invalid)
      return;
    this.spinnerService.show(SpinnerType.BallScaleMultiple);
    this.userAuthService.resetPassword(email, () =>{
      this.toastifyService.message("Mail sended your given mail address.", "Successfully", {
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.spinnerService.hide(SpinnerType.BallScaleMultiple);
    });  
  };
}