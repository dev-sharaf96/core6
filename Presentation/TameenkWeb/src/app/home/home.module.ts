import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { SlickModule } from 'ngx-slick';
import { InstructionsComponent } from './instructions/instructions.component';
import { PartnersSliderComponent } from './partners-slider/partners-slider.component';
import { InquiryComponent } from './inquiry/inquiry.component';

import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './inquiry/main/main.component';
import { InsuredComponent } from './inquiry/insured/insured.component';
import { VehicleComponent } from './inquiry/vehicle/vehicle.component';
import { MissingFieldsComponent } from './inquiry/missing-fields/missing-fields.component';
import { MissingFieldComponent } from './inquiry/missing-fields/missing-field/missing-field.component';
import { AdditionalDriverComponent } from './inquiry/insured/additional-driver/additional-driver.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    TranslateModule,
    SlickModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    MainSliderComponent,
    InstructionsComponent,
    PartnersSliderComponent,
    InquiryComponent,
    MainComponent,
    InsuredComponent,
    InsuredComponent,
    VehicleComponent,
    MissingFieldsComponent,
    MissingFieldComponent,
    AdditionalDriverComponent
  ]
})
export class HomeModule { }
