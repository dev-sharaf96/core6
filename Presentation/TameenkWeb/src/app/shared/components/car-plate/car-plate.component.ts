import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car-plate',
  templateUrl: './car-plate.component.html',
  styleUrls: ['./car-plate.component.css']
})
export class CarPlateComponent implements OnInit {
  @Input() plateColorType;
  @Input() carPlateNumber;
  @Input() carPlateText1;
  @Input() carPlateText2;
  @Input() carPlateText3;
  carPlateNumberAr;
  plateColorsMap = {
    1: 'white',
    2: 'blue',
    3: 'blue',
    4: 'blue',
    5: 'blue',
    6: 'yellow',
    7: 'blue',
    8: 'black',
    9: 'green',
    10: 'white',
    11: 'black'
  };
  plateTextMap = {
    أ: 'A',
    ب: 'B',
    ح: 'J',
    د: 'D',
    ر: 'R',
    س: 'S',
    ص: 'X',
    ط: 'T',
    ع: 'E',
    ق: 'G',
    ك: 'K',
    ل: 'L',
    م: 'Z',
    ن: 'N',
    ه: 'H',
    و: 'U',
    ي: 'V'
  };
  constructor() {}

  ngOnInit() {
    this.carPlateNumberAr = this.toArabicDigits(this.carPlateNumber);
  }
  toArabicDigits(num: number) {
    const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const str = num.toString();
    str.split('');
    return str.replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  }
}
