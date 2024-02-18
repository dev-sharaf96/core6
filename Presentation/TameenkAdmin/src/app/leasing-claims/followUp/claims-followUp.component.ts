import { IIdNamePairModel, LocalizationService } from "src/app/core";
import { Component, OnInit } from "@angular/core";
import { ClaimsFollowUpFilterModel } from "./Claims-followUpFilter";
import { ToastrService } from "ngx-toastr";
import { ClaimsResponseModel } from "./Model/claimsResponseModel";
import { ClaimsFollowupService } from "src/app/core/services/claims-followup.service";

@Component({
  selector: "app-claims-followUp",
  templateUrl: "./claims-followUp.component.html",
  styleUrls: ["./claims-followUp.component.css"],
})
export class ClaimsFollowUpComponent implements OnInit {
  ClaimsFilter: ClaimsFollowUpFilterModel = new ClaimsFollowUpFilterModel();
  claimsListing: ClaimsResponseModel[];
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = "ــــــــــــــــــ";
  today = new Date();
  isSearch = false;
  lang: string = "en";
  claimsOptions: IIdNamePairModel[] = [];
  claimRequesterTypeOptions: IIdNamePairModel[] = [];

  constructor(
    private _claimsFollowupService: ClaimsFollowupService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.firstTime = true;
    this.lang = this._localizationService.getCurrentLanguage().twoLetterIsoCode;

    this._claimsFollowupService.getAllClaimsStatus(this.lang)
    .subscribe((response:any) => {
      let resultFromAPI = [{ id: null, name: 'all' }];
      response.Result.forEach((claimStatus) => {
        let statusName = this.lang === 'en'? claimStatus.StatusNameEn:claimStatus.StatusNameAr;
        resultFromAPI.push({ id: claimStatus.StatusCode, name: statusName });
      });
      this.claimsOptions = resultFromAPI;
    });

    this._claimsFollowupService.getClaimRequesterTypes()
    .subscribe((response:any) => {

      let resultFromAPI = [{ id: null, name: 'all' }];
      response.Result.forEach((claimRequesterType) => {
        resultFromAPI.push({ id: claimRequesterType.id, name: claimRequesterType.key });
      });
      this.claimRequesterTypeOptions = resultFromAPI;
    });
  }

  filterClick(e) {
    this.isSearch = true;
    e.reset();
  }
  FilterCliamsLazyLoad(event) {
    this.loading = true;
    this.ClaimsFilter.pageNumber = event.first / event.rows > 0 ? event.first / event.rows : 1;
    this.ClaimsFilter.pageSize = event.rows;
    this._claimsFollowupService
      .getFilterClaims(this.ClaimsFilter, this.lang)
      .subscribe(
        (data: any) => {
          this.claimsListing = data.Result ? data.Result.claims : null;
          this.loading = false;
          this.firstTime = false;
          this.isSearch = false;
        },
        (error: any) => {
          this.loading = false;
          this.firstTime = false;
          this.isSearch = false;
          if (error.errors) {
            error.errors.forEach((item) => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }
}
