import * as FileSaver from "file-saver";
import { ActivatedRoute } from "@angular/router";
import { IIdNamePairModel, LocalizationService } from "../../core";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { UserClaimListingModel } from "./Model/user-claim-listing-model";
import { ClaimsFollowupService } from "src/app/core/services/claims-followup.service";
import { ClaimsFollowUpFilterModel } from "../followUp/Claims-followUpFilter";
import { ClaimsUpdateModel } from "./Model/claims-update-model";

@Component({
  selector: "app-claims-details",
  templateUrl: "./claim-details.component.html",
  styleUrls: ["./claim-details.component.css"],
})
export class ClaimsDetailsComponent implements OnInit {
  claim: UserClaimListingModel = new UserClaimListingModel();
  claimsFilter: ClaimsFollowUpFilterModel = new ClaimsFollowUpFilterModel();
  claimsUpdate: ClaimsUpdateModel = new ClaimsUpdateModel();
  emptyStringValue = "ــــــــــــــــــ";
  lang: string = "en";
  claimsOptions: IIdNamePairModel[] = [];
  loading: boolean;

  constructor(
    private _claimsFollowupService: ClaimsFollowupService,
    private route: ActivatedRoute,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.lang = this._localizationService.getCurrentLanguage().twoLetterIsoCode;

    this.claimsFilter.Id = +this.route.snapshot.paramMap.get("id");
    this.claimsFilter.pageNumber = 1;
    this.claimsFilter.pageSize = 10;
    
    this.loading = true;
    this._claimsFollowupService.getClaimDetails(this.claimsFilter, this.lang)
          .subscribe((data) => {
            this.loading = false;
            this.claim = data.Result;
          });

    this._claimsFollowupService.getAllClaimsStatus(this.lang)
          .subscribe((response:any) => {
            let statusFromAPI = [];
            response.Result.forEach((claimStatus) => {
              let statusName = this.lang === 'en'? claimStatus.StatusNameEn:claimStatus.StatusNameAr;
              statusFromAPI.push({ id: claimStatus.StatusCode, name: statusName });
            });
            this.claimsOptions = statusFromAPI;
          });
  }

  DownloadFile(filetId) {
    this._claimsFollowupService.downloadCliamfile(filetId, this.lang).subscribe(
      (data) => {
        if (data.Result) {
          const ext = data.Result.fileExtension;
            FileSaver.saveAs(
              `data:image/${ext};base64,` + data.Result.fileData,
              `claim file${filetId}` + `.${ext}`
            );
        }
      },
      (error: any) => {
        if (error.errors) {
          error.errors.forEach((item) => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  onSubmit() {
    this.claimsUpdate.id = this.claimsFilter.Id;
    this.claimsUpdate.claimStatusId = this.claim.claimStatusId;

    this._claimsFollowupService
      .UpdateClaim(this.claimsUpdate, this.lang)
      .subscribe(
        (data) => {
          if (data.Result === true) {
            this._toastrService.success(data.errorDescription);
          } else {
            this._toastrService.error(data.errorDescription);
          }
        },
        (error: any) => {
          if (error.errors) {
            error.errors.forEach((item) => {
              this._toastrService.error(item.description, item.code);
            });
          }
        }
      );
  }
}
