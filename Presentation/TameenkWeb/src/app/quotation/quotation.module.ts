import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { OptionsComponent } from './options/options.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './products-list/product/product.component';
import { BenefitsComponent } from './products-list/product/benefits/benefits.component';
import { ComparisonComponent } from './products-list/comparison/comparison.component';
import { ComparisonProductComponent } from './products-list/comparison/comparison-product/comparison-product.component';

@NgModule({
  imports: [
    CommonModule,
    QuotationRoutingModule,
    SharedModule
  ],
  declarations: [
    QuotationComponent,
    VehicleInfoComponent,
    OptionsComponent,
    ProductsListComponent,
    ProductComponent,
    BenefitsComponent,
    ComparisonComponent,
    ComparisonProductComponent
  ]
})
export class QuotationModule { }
