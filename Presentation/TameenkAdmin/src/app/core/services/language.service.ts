import { Injectable } from '@angular/core';

/**
 *
 *
 * @export
 * @class LanguageService
 */
@Injectable()
export class LanguageService {
  /**
   * return current language saved in localStorage or return en
   *
   * @returns {string}
   * @memberof LanguageService
   */
  getLanguage(): string {
    if (localStorage) {
      return localStorage['language'] || 'en';
    } else {
      return 'en';
    }
  }
  /**
   * save current language in localStorage
   *
   * @param  {string} language
   * @returns {void}
   * @memberof LanguageService
   */
  setLanguage(language: string): void {
    if (localStorage) {
      localStorage['language'] = language;
    }
  }
}
