import { CommonResponse } from './../core/models/common.response.model';
import { Component, OnInit } from '@angular/core';
import { InsuranceCompanyService, IFilter, IInvoice, LocalizationService, AdminPolicyService } from '../core';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  isEnglish;
  firstDate: Date;
  lastDate: Date;

  emptyStringValue = 'ــــــــــــــــــ';

  invoiceLoading;
  invoiceData: IInvoice[];
  invoiceTotalRecords;
  eventHolder;
  defaultSortField = 'id';
  filter: IFilter = {
    startDate: null,
    endDate: null,
    referenceId: null,
    invoiceNo: null,
    policyNo: null
  };
  /**
   * Creates an instance of InvoiceComponent.
   * @param {AdminPolicyService} _adminPolicyService
   * @param {InsuranceCompanyService} _insuranceCompanyService
   * @param {LocalizationService} _localizationService
   * @memberof InvoiceComponent
   */
  constructor(
    private _adminPolicyService: AdminPolicyService,
    private _insuranceCompanyService: InsuranceCompanyService,
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService
    ) {
    this.isEnglish = _localizationService.getCurrentLanguage().id === 2;
  }

  ngOnInit() {
    this.invoiceLoading = true;
  }



  onSubmit() {
    this.invoiceLazyLoad(this.eventHolder);
  }

  /**
   * @method invoiceLazyLoad()
   * @summary load  invoices async by pagination and sort data
   *
   * @param {*} event
   * @memberof InvoiceComponent
   */
  invoiceLazyLoad(event) {
    this.invoiceLoading = true;
    this.eventHolder = event;
    this._insuranceCompanyService.getAllInvoices(
      this.filter,
      `?pageIndex=${event.first / event.rows}&pageSize=${event.rows}
      &sortField=${event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`
    ).subscribe(
        (data: CommonResponse<IInvoice[]>) => {
          this.invoiceLoading = false;
          this.invoiceData = data.data;
          this.invoiceData.forEach(invoice => {
            invoice.insuranceCompanyName =
            this.isEnglish ? invoice.insuranceCompanyNameEN : invoice.insuranceCompanyNameAR;
            invoice.productType =
            this.isEnglish ? invoice.productTypeEN : invoice.productTypeAR;
        });
          this.invoiceTotalRecords = data.totalCount;
      },
      (error: any) => {
        this.invoiceLoading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  downloadInvoice(referenceId) {
    this.invoiceLoading = true;

    this._adminPolicyService.downloadInvoiceFile(referenceId).subscribe(
      (data: CommonResponse<string>) => {
        this.invoiceLoading = false;

        if (data.data) {
          FileSaver.saveAs('data:application/pdf;base64,' + data.data, referenceId+'.pdf');
        }
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

}
