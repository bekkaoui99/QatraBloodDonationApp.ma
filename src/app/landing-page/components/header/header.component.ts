import { Component } from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  selectedLanguage!: string;
  isMobileMenuOpen = false;
  languageDropdownVisible: boolean = false;
  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.selectedLanguage = this.languageService.getSelectedLanguage();
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
    this.reloadPage();
  }

  reloadPage() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      window.location.reload();
    });
  }
}
