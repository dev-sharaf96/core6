import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs/Subscription";
export class Language {
  id: number;
  twoLetterIsoCode: string;
  constructor(id: number, twoLetterIsoCode: string) {
    this.id = id;
    this.twoLetterIsoCode = twoLetterIsoCode;
  }
}
@Injectable()
export class LocalizationService implements OnInit, OnDestroy {
  languages: Language[] = [new Language(1, "ar"), new Language(2, "en")];
  onLangChange: Subscription = undefined;
  constructor(private _transalateService: TranslateService) {}

  ngOnInit() {}
  ngOnDestroy() {
    if (this.onLangChange !== undefined) {
      this.onLangChange.unsubscribe();
    }
  }
  configure() {
    this.setCurrentLanguage(this.getCurrentLanguage().twoLetterIsoCode);
    this.updateLanguage();
    this.onLangChange = this._transalateService.onLangChange.subscribe(() => {
      this.updateLanguage();
    });
  }
  getCurrentLanguage(): Language {
    const twoLetterIsoCode =
      this._transalateService.currentLang || this.getLanguageFromLocalStorage();
    return this.languages.find(
      (lang) =>
        lang.twoLetterIsoCode.toLowerCase() === twoLetterIsoCode.toLowerCase()
    );
  }
  /**
   * set current language
   * @param {string} twoLetterIsoCode - language two letter ISO code.
   */
  setCurrentLanguage(twoLetterIsoCode: string) {
    let language = this.languages.find(
      (lang) =>
        lang.twoLetterIsoCode.toLowerCase() === twoLetterIsoCode.toLowerCase()
    );
    language = language || this.languages.find((lang) => lang.id === 2);
    this._transalateService.use(language.twoLetterIsoCode);
    this.setLanguageInLocalStorage(language);
  }
  /**
   * return current language saved in localStorage or return en
   *
   * @returns {string}
   * @memberof LanguageService
   */
  private getLanguageFromLocalStorage() {
    if (localStorage) {
      return localStorage["language"] || "en";
    }
    return "en";
  }
  /**
   * save current language in localStorage
   *
   * @param  {Language} language
   * @returns {void}
   * @memberof LanguageService
   */
  private setLanguageInLocalStorage(language: Language): void {
    if (localStorage) {
      localStorage["language"] = language.twoLetterIsoCode;
    }
  }

  /**
   * update page style by language
   */
  updateLanguage() {
    const lang = document.createAttribute("lang");
    const dir = document.createAttribute("dir");
    const langCode = this.getCurrentLanguage().twoLetterIsoCode;
    lang.value = langCode;
    dir.value = langCode === "ar" ? "rtl" : "ltr";
    document.documentElement.attributes.setNamedItem(lang);
    document.documentElement.attributes.setNamedItem(dir);
  }
}
