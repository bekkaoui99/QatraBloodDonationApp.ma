import { Component } from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-userModule-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  selectedLanguage!: string;
  isMobileMenuOpen = false;
  languageDropdownVisible: boolean = false;

  constructor(
    private languageService: LanguageService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.selectedLanguage = this.languageService.getCurrentLanguage();

  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleLanguageDropdown() {
    this.languageDropdownVisible = !this.languageDropdownVisible;
  }

  setLanguage(language: string) {
    this.languageService.setLanguage(language)
    this.languageDropdownVisible = false;
    this.selectedLanguage = language;
  }

  logout() {
    this.authenticationService.logout();
  }
}
