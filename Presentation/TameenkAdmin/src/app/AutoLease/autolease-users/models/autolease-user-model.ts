import { SettingsRoutingModule } from "../../../settings/settings-routing.module";

export class AutoleaseUserModel {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  bankName: string;
  isLock: boolean;
  lang: string;
  bankId: number;
  lockoutEndDateUtc: Date;
  isSuperAdmin: boolean;
}
