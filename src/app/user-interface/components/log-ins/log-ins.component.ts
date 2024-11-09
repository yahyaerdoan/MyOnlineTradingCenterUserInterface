import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInUser } from '../../../entities/users/loginuser';
import { BasesComponent, SpinnerType } from '../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageType, Position, ToastrfyService } from '../../../services/interface-services/user/services/toastrfy.service';
import { AuthService } from '../../../services/core-services/general-services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../services/core-services/feature-services/user-auth.service';
import { FunctionResponse } from '../../../contracts/responses/functionResponse';
import { TokenResponse } from '../../../contracts/responses/tokenResponse';

@Component({
  selector: 'app-log-ins',
  templateUrl: './log-ins.component.html',
  styleUrl: './log-ins.component.scss'
})
export class LogInsComponent extends BasesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userAuthService: UserAuthService,
    spinner: NgxSpinnerService, private toastfyService: ToastrfyService,
    private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
    private socialAuthService: SocialAuthService) { super(spinner) }

  formGroup!: FormGroup;
  submitted: boolean = false;

  async ngOnInit(): Promise<void> {
    this.initializeForm();
    await this.signInWithGoogle();
  }

  initializeForm() {
    this.formGroup = this.formBuilder.group({
      userNameOrEmail: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  get validate() {
    return this.formGroup.controls;
  }

  async onSubmit(logInUser: LogInUser) {
    this.submitted = true;
    if (this.formGroup.invalid)
      return;
    this.showSpinner(SpinnerType.BallScaleMultiple);
    const result: FunctionResponse<TokenResponse> = await this.userAuthService.logIn(logInUser, () => {
      this.authService.identityCheck();
      this.hideSpinner(SpinnerType.BallScaleMultiple)
    });
    if (result.isSuccessful) {
      this.showToastMessage(result.isSuccessful, result.message);
      this.handleNagigationAfterLogin();
    } else {
      this.showToastMessage(result.isSuccessful, result.message, result.errors);
      this.hideSpinner(SpinnerType.BallScaleMultiple);
    }
    //this.showToastMessage(result.isSuccessful, result.message, result.errors);
    console.log('Form Submitted:', this.formGroup.value);
  }

  async signInWithGoogle() {
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.BallScaleMultiple);
      const result = await this.userAuthService.logInWithGoogle(user, () =>{   
        this.authService.identityCheck();
        this.hideSpinner(SpinnerType.BallScaleMultiple)})
        if (result.isSuccessful) {
          this.showToastMessage(result.isSuccessful, result.message);
          this.handleNagigationAfterLogin();
        } else {
          this.showToastMessage(result.isSuccessful, result.message, result.errors);
          this.hideSpinner(SpinnerType.BallScaleMultiple);
        }
      console.log('Form Submitted:', user)
    });
  }

  private handleNagigationAfterLogin(){
    this.activatedRoute.queryParams.subscribe(params => {
      const returnUrl: string = params["returnUrl"];
      Promise.resolve().then(()=>{
        if (returnUrl)
          this.router.navigate([returnUrl])
        else
          this.router.navigate([""])
      });
    });
  }
  private showToastMessage(success: boolean, message: string, errors?: string[]) {
    const messageType = success ? MessageType.Success : MessageType.Error;
    const title = success ? "Success!" : "Error!";

    let fullMessage = '';
    if(errors && errors.length > 0){
      fullMessage += errors.join(', ') + ': ';
    }
    fullMessage += message;

    this.toastfyService.message(fullMessage, title, {
      messageType: messageType,
      position: Position.TopRight
    })
  }
}