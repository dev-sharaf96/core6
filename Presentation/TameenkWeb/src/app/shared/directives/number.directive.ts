import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberDirective {
  constructor() { }
  @HostListener('keypress', ['$event']) numberKey(e) {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
    }
 }
}
