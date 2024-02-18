import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
  IProduct,
  IInsuranceCompany,
  QuotationService,
  AdministrationService,
  CommonResponse,
  IQuotationResponse,
  HttpCancelService
} from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Guid } from 'guid-typescript';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  subscription;
  quotationRequestId;
  public products: IProduct[];
  public filteredProducts: IProduct[];
  public companiesList: IInsuranceCompany[];
  public isDone = false;
  insuranceTypeId: number;
  deductibleValue: number;
  vehicleAgencyRepair: boolean;
  companiesCount;
  tryiesCount = 0;
  companyInfo;
  productsSortingOrder;
  recalled = false;
  comprehensiveQuotationsPrice: number[];
  guid;
  public referenceId;
  routeSub;
  quotaionObservable;
  constructor(
    private _quotationService: QuotationService,
    private _administration: AdministrationService,
    private _httpCancelService: HttpCancelService,
    private _route: ActivatedRoute,
    private _toastrService: ToastrService) { document.body.classList.remove('page-loading-container'); }

  ngOnInit() {
    if (window['checkoutErrors']) {
      window['checkoutErrors'].forEach(err => {
        this._toastrService.info(err, '');
      });
    }
    this._route.queryParams.subscribe(params => {
      this.insuranceTypeId = parseInt(params['TypeOfInsurance'], 10) || null;
      this.vehicleAgencyRepair = params['VehicleAgencyRepair'] || false;
      this.deductibleValue = params['DeductibleValue'] || 2000;
    });
    this._httpCancelService.pendingRequestsUrl = environment.quotationApiUrl + 'quote/';
    this.routeSub = this._route.params.subscribe(params => {
      this.quotationRequestId = params['id'];
      this.getQuotaions();
    });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  getQuotaions() {
    if (!localStorage.getItem('Guid')) {
      this.guid = Guid.create();
      localStorage.setItem('Guid', this.guid);
    }
    this.recalled = true;
    this.products = [];
    this.filteredProducts = [];
    this.subscription = this._administration.getInsuranceCompanies().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data: CommonResponse<IInsuranceCompany[]>) => {
        this.companiesList = data.data;
        this.companiesCount = data.totalCount;
        this.tryiesCount = 0;
        this.companiesList.forEach((company: IInsuranceCompany) => {
          this.getQuotaion(
            new QuotaionParams(
              company.id,
              this.quotationRequestId,
              localStorage.getItem('Guid'),
              1,
              this.vehicleAgencyRepair,
              this.deductibleValue
            ));
          this.getQuotaion(
            new QuotaionParams(
              company.id,
              this.quotationRequestId,
              localStorage.getItem('Guid'),
              2,
              this.vehicleAgencyRepair,
              this.deductibleValue
            ));
        });
        this.recalled = false;
      }, error => {
        this.recalled = false;
        this.isDone = true;
        return error;
      }
    );
  }
  GetCompanyKey(insuranceCompanyId) {
    for (const company of this.companiesList) {
      if (company.id === insuranceCompanyId) {
        return company.key;
      }
    }
    return '';
  }
  private getQuotaion(params: QuotaionParams) {
    this._quotationService.getQuotaion(params.toHttpParams()).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: CommonResponse<IQuotationResponse>) => {
      const result = data.data;
      result.products.forEach(q => {
        q.referenceId = result.referenceId;
        // q.insuranceTypeCode = result.insuranceTypeCode;
        q.companyKey = this.GetCompanyKey(q.providerId);
      });
      this.products = this.products.concat(result.products);
      this.changeInsuranceType(this.insuranceTypeId);
      if (this.productsSortingOrder != null) {
        this.productsSorting(this.productsSortingOrder);
      }
      this.tryiesCount += 1;
      if (
        this.tryiesCount === (this.companiesCount * 2)) {
        this.isDone = true;
      }
    },
      (error: Error) => {
        this.tryiesCount += 1;
        if (
          this.tryiesCount === (this.companiesCount * 2)
        ) {
          this.isDone = true;
        }
        return error;
      }
    );
  }
  changeInsuranceType(insuranceTypeId) {
    if (insuranceTypeId) {
      this.insuranceTypeId = insuranceTypeId;
      this.filteredProducts = this.products.filter(function (product) {
        return product.insuranceTypeCode == insuranceTypeId;
      });
    } else {
      this.insuranceTypeId = null;
      this.filteredProducts = this.products;
    }
  }
  changeRepairType(vehicleAgencyRepair) {
    this.vehicleAgencyRepair = vehicleAgencyRepair;
    this.isDone = false;
    this.recalled = true;
    this.products = [];
    this.filteredProducts = [];
    // this._httpCancelService.cancelPendingRequests();
    this.ngUnsubscribe.next();
    this.subscription.unsubscribe();
    setTimeout(() => {
      this.getQuotaions();
    }, 500);
  }
  changeDeductibleValue(deductibleValue) {
    this.deductibleValue = deductibleValue;
    this.isDone = false;
    this.recalled = true;
    this.products = [];
    this.filteredProducts = [];
    // this._httpCancelService.cancelPendingRequests();
    this.ngUnsubscribe.next();
    this.subscription.unsubscribe();
    setTimeout(() => {
      this.getQuotaions();
    }, 500);
  }
  getCompanyInfo(e) {
    if (this.companiesList) {
      this.companyInfo = this.companiesList.find(c => c.id === e);
    }
  }
  productsSorting(e) {
    this.productsSortingOrder = e;
    if (e) {
      this.filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
    } else {
      this.filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
    }
  }
}
class QuotaionParams {
  insuranceCompanyId: number;
  qtRqstExtrnlId: string;
  parentRequestId: string;
  insuranceTypeCode: number;
  vehicleAgencyRepair: boolean;
  deductibleValue: number;
  /**
   * Generate new object of quotaion parameter for Qoute API.
   * @constructor
   * @param {number} insuranceCompanyId - the insurance company identifier.
   * @param {string} qtRqstExtrnlId - the quotaion external identifier.
   **/
  constructor(
    insuranceCompanyId: number,
    qtRqstExtrnlId: string,
    parentRequestId: string,
    insuranceTypeCode: number = 1,
    vehicleAgencyRepair: boolean = false,
    deductibleValue: number = 2000
  ) {
    this.insuranceCompanyId = insuranceCompanyId;
    this.qtRqstExtrnlId = qtRqstExtrnlId;
    this.parentRequestId = parentRequestId;
    this.insuranceTypeCode = insuranceTypeCode;
    this.vehicleAgencyRepair = vehicleAgencyRepair;
    this.deductibleValue = deductibleValue;
  }
  toHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append(
      'insuranceCompanyId',
      this.insuranceCompanyId.toString()
    );
    httpParams = httpParams.append('qtRqstExtrnlId', this.qtRqstExtrnlId);
    httpParams = httpParams.append('parentRequestId', this.parentRequestId);
    httpParams = httpParams.append(
      'insuranceTypeCode',
      this.insuranceTypeCode.toString()
    );
    httpParams = httpParams.append(
      'vehicleAgencyRepair',
      '' + this.vehicleAgencyRepair
    );
    if (this.insuranceTypeCode === 2) {
      httpParams = httpParams.append(
        'deductibleValue',
        '' + this.deductibleValue
      );
    }
    return httpParams;
  }
}
