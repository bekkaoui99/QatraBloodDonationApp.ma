import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private defaultLanguage = 'en';
  private supportedLanguages = ['en', 'fr' , 'ar'];


  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  getSelectedLanguage(): string {
    return this.translate.currentLang;
  }


  private initLanguage() {
    const savedLanguage = localStorage.getItem('language');
    const languageToSet = savedLanguage || this.defaultLanguage;
    this.setLanguage(languageToSet);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }



  setLanguage(language: string) {
    if (this.supportedLanguages.includes(language)) {
      this.translate.use(language);
      localStorage.setItem('language', language); // Save to local storage
      if (language === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.classList.add('rtl');
        document.documentElement.classList.remove('ltr');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.classList.add('ltr');
        document.documentElement.classList.remove('rtl');
      }
    } else {
      console.warn(`Language '${language}' is not supported. Using default '${this.defaultLanguage}'.`);
      this.translate.use(this.defaultLanguage);
      localStorage.setItem('language', this.defaultLanguage);
    }
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

}
