import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInUser } from '../../../entities/users/loginuser';
import { UserService } from '../../../services/core/models/user.service';
import { BasesComponent, SpinnerType } from '../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageType, Position, ToastrfyService } from '../../../services/features/user/services/toastrfy.service';
import { LogInUserResponse } from '../../../contracts/users/loginuserresponse';
import { AuthService } from '../../../services/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-ins',
  templateUrl: './log-ins.component.html',
  styleUrl: './log-ins.component.scss'
})
export class LogInsComponent extends BasesComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    spinner: NgxSpinnerService, private toastfyService: ToastrfyService,
    private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router){super(spinner)}

  formGroup!: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.formGroup = this.formBuilder.group({
      userNameOrEmail: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  get validate(){
    return this.formGroup.controls;
  }

 async onSubmit(logInUser: LogInUser){
    this.submitted = true;
    if(this.formGroup.invalid)
      return;
    this.showSpinner(SpinnerType.BallScaleMultiple);
    const result: LogInUserResponse = await this.userService.logIn(logInUser, () => {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params =>{
       const returnUrl: string = params["returnUrl"];
       if (returnUrl) 
        this.router.navigate([returnUrl])
      })
      this.hideSpinner(SpinnerType.BallScaleMultiple)
    });
    if(result.succeeded)
      this.toastfyService.message(result.message, "Success!",{
      messageType: MessageType.Success,
      position: Position.TopRight
    })
    else
    this.toastfyService.message(result.message, "Error!",{
      messageType: MessageType.Error,
      position: Position.TopRight
  })
 

    // Continue with your form submission logic
    console.log('Form Submitted:', this.formGroup.value);
  }
}
