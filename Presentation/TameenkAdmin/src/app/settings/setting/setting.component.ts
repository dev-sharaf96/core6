import { Component, OnInit } from '@angular/core';
import { IPromotionsSettings, PromotionSettingsService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settings: IPromotionsSettings = new IPromotionsSettings();
  submitted: boolean;
  constructor(private _promotionSettingsService: PromotionSettingsService, private _toastrService: ToastrService) { }

  ngOnInit() {
    this._promotionSettingsService.getSettings().subscribe(data => {
      this.settings = data || this.settings;
    });
  }

  onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      this._promotionSettingsService.saveSettings(this.settings).subscribe(res => {
        this._toastrService.success('تم بنجاح');
      }, error => {
        this._toastrService.error(error.Message);
      });
    }
  }

  displayFieldCss(field) {
    return {
      'has-error': field.invalid && this.submitted
    };
  }
}
