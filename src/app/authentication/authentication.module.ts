import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import {ToastModule} from "primeng/toast";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ToastModule,
    ReactiveFormsModule
  ],
  providers:[
  ]
})
export class AuthenticationModule { }
