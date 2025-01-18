import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import {RouterLink} from "@angular/router";



@NgModule({
    declarations: [
        FooterComponent
    ],
    exports: [
        FooterComponent
    ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class SharedModule { }
