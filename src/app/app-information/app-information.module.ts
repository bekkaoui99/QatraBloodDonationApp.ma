import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppInformationRoutingModule } from './app-information-routing.module';
import { AppInformationComponent } from './app-information.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { LegalInformationsComponent } from './components/legal-informations/legal-informations.component';


@NgModule({
  declarations: [
    AppInformationComponent,
    PrivacyPolicyComponent,
    LegalInformationsComponent
  ],
  imports: [
    CommonModule,
    AppInformationRoutingModule
  ]
})
export class AppInformationModule { }
