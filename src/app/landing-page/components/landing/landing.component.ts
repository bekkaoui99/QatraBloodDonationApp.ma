import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{

  selectedLanguage: string = "";
  constructor(private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }


}
