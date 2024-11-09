import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInterfaceModule } from './user-interface/user-interface.module';
import { AdminInterfaceModule } from './admin-interface/admin-interface.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import {  HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt'
import { HttpErrorHandlerInterceptorService } from './services/core-services/general-services/http-error-handler-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    UserInterfaceModule,
    AdminInterfaceModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    JwtModule.forRoot({ config: {
      tokenGetter: ()=> localStorage.getItem("accessToken"),
      allowedDomains: ["localhost:7241"],      
    }})
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: 'baseUrl', useValue:'https://localhost:7241/api', multi: true},
    {provide: 'signalRBaseUrl', useValue:'https://localhost:7241', multi: true},
    provideHttpClient(withInterceptorsFromDi()),
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
