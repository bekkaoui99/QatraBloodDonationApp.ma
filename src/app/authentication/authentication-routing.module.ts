import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import {RegisterComponent} from "./Components/register/register.component";
import {LoginComponent} from "./Components/login/login.component";
import {ForgotPasswordComponent} from "./Components/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./Components/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgetPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
