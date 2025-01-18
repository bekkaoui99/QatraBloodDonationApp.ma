import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserModuleComponent } from './user-module.component';
import { AccountComponent } from './components/account/account.component';
import { DonateComponent } from './components/donate/donate.component';
import { DonationComponent } from './components/donation/donation.component';
import { HeaderComponent } from './components/header/header.component';
import {TranslatePipe} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {PaginatorModule} from "primeng/paginator";


@NgModule({
  declarations: [
    UserModuleComponent,
    AccountComponent,
    DonateComponent,
    DonationComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    TranslatePipe,
    ReactiveFormsModule,
    SharedModule,
    PaginatorModule
  ]
})
export class UserModuleModule { }
