import { Injectable, Injector } from "@angular/core";
import { ApiService } from "./api.service";
import { environment } from "src/environments/environment";
import { ClaimsFollowUpFilterModel } from "src/app/leasing-claims/followUp/Claims-followUpFilter";
import { ClaimsUpdateModel } from "src/app/leasing-claims/claims-details/Model/claims-update-model";

@Injectable({
  providedIn: "root",
})
export class ClaimsFollowupService extends ApiService {
  constructor(private _injector: Injector) {
    super(_injector);

    this.apiUrl = environment.administrationUrl + "Policy/";
  }

  getAllClaimsStatus(lang:string) {
    return super.get<any>(`GetAllClaimsStatus?lang=${lang}`);
  }

  getClaimRequesterTypes() {
    return super.get<any>(`GetClaimRequesterTypes`);
  }

  getFilterClaims(body, lang) {
    return super.post<any>(`GetUserClaimsByfilter?lang=${lang}`, body);
  }

  getClaimDetails(claimsFilter: ClaimsFollowUpFilterModel,lang:string) {
    return super.post<any>(`Details?lang=${lang}`, claimsFilter );
  }

  downloadCliamfile(fileId: number,lang:string) {
    return super.get<any>('DownloadClaimFilebyFileId', `fileId=${fileId}&lang=${lang}`);
  }
  
  UpdateClaim(claimsFilter: ClaimsUpdateModel,lang:string) {
    return super.post<any>(`UpdateClaims?lang=${lang}`, claimsFilter );
  }
}


