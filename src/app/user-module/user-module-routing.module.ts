import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModuleComponent } from './user-module.component';
import {authenticationGuard} from "../services/guard/authentication.guard";
import {AccountComponent} from "./components/account/account.component";
import {DonateComponent} from "./components/donate/donate.component";
import {DonationComponent} from "./components/donation/donation.component";

const routes: Routes = [
  {
    path: '',
    component: UserModuleComponent,
    canActivate:[authenticationGuard],
    children:[
      {
        path:'account',
        component:AccountComponent
      },
      {
        path:'donate',
        component:DonateComponent
      },
      {
        path:'donation',
        component:DonationComponent
      }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
