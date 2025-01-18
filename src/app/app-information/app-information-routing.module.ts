import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppInformationComponent } from './app-information.component';
import {LegalInformationsComponent} from "./components/legal-informations/legal-informations.component";
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";

const routes: Routes = [
  {
    path: '',
    component: AppInformationComponent
  },
  {
    path: 'legal-information',
    component: LegalInformationsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppInformationRoutingModule { }
