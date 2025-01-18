import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { BloodTypeComponent } from './components/blood-type/blood-type.component';
import { QuestionComponent } from './components/question/question.component';
import {SharedModule} from "../shared/shared.module";
import {TranslatePipe} from "@ngx-translate/core";


@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent,
    LandingComponent,
    HowItWorksComponent,
    BloodTypeComponent,
    QuestionComponent
  ],
    imports: [
        CommonModule,
        LandingPageRoutingModule,
        SharedModule,
        TranslatePipe
    ]
})
export class LandingPageModule { }
