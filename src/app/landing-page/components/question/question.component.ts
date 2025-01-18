import { Component } from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  faqItems: any[] = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.loadFaqData();
  }

  loadFaqData() {
    // Fetch the FAQ items dynamically based on the selected language
    this.translateService.get('faqItems').subscribe(translations => {
      this.faqItems = translations;
    });
  }



}
