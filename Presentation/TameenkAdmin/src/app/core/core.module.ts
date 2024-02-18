import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";

import {
  PolicyService,
  LanguageService,
  NotificationService,
  InsuranceCompanyService,
  LocalizationService,
  AuthenticationService,
  AddressService,
  VehicleService,
  NajmService,
  RequestLogsService,
  CheckoutsService,
} from "./services";
import { VehicleMakerService } from "./services/vehicle-maker.service";
import { YakeenCityCenterService } from "./services/yakeen-city-center.service";
import { ModuleLoadedOnceGuard } from "./module-load-onec.guard";
@NgModule({})
export class CoreModule extends ModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AuthenticationService,
        PolicyService,
        NotificationService,
        LanguageService,
        InsuranceCompanyService,
        LocalizationService,
        AddressService,
        VehicleService,
        NajmService,
        RequestLogsService,
        CheckoutsService,
        VehicleMakerService,
        YakeenCityCenterService,
      ],
    };
  }
}
