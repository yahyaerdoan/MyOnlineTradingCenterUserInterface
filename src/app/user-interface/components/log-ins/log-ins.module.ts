import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInsComponent } from './log-ins.component';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';
import { FootersModule } from '../footers/footers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';




@NgModule({
  declarations: [
    LogInsComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    FootersModule,
    RouterModule.forChild([{path: "logins", component: LogInsComponent}
    ]),
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '554001534100-n61ikte483p3maaeo3drs07p1eph7inu.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
})
export class LogInsModule { }
