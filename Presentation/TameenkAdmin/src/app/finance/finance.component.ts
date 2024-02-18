import * as FileSaver from 'file-saver';

import { AdminPolicyService, CommonResponse, InsuranceCompanyService, LocalizationService } from '../core';
import { Component, OnInit } from '@angular/core';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SamaReport } from './sama-report';
import { SamaReportFilter } from './sama-report-filter';
import { SamaReportResult } from './sama-report-result';
import { ToastrService } from 'ngx-toastr';
import randomColor from 'randomcolor';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  firstDate: Date;
  lastDate: Date;
  samaFilter: SamaReportFilter = new SamaReportFilter();
  defaultSortField = 'InvoiceDate';
  emptyStringValue = 'ــــــــــــــــــ';
  today = new Date();
  yearRange = `${this.today.getFullYear() - 100}:${this.today.getFullYear()}`;
  samaReportLoading: boolean;
  samaReportData: SamaReport[];
  samaReportDataCount: number;
  firstTime: boolean;
  chartData;
  options;
  isSearch = false;
  isEnglish: boolean;
  userType:any;

constructor(
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService,
    private _adminPolicyService: AdminPolicyService,
    private _localizationService: LocalizationService
    ) { }

  ngOnInit() {
    this.samaFilter.invoiceDateFrom = this.today;
    this.samaFilter.invoiceDateTo = this.today;
    this.samaReportLoading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    if(this.isEnglish){
      this.userType=[
        {label:'All', value:null},
        {label:'corporate', value:1},
        {label:'individual', value:0},
      ];
   
    }else{
      this.userType=[
        {label:'الكل', value:null},
        {label:'شركات', value: 1},
        {label:'أفراد', value: 0},
      ];
    
    }
  }

  filterClick(e) {
    this.isSearch = true;
    // this.setFilterTimeZone();
    e.reset();
  }

  samaReportLazyLoad(event) {
    this.samaReportLoading = true;
    console.log(this.samaFilter);
    this._adminPolicyService.getSamaReportWithFilter(this.samaFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<SamaReportResult>) => {
        this.samaReportData = data.data.samaReports;
        this.samaReportDataCount = data.totalCount;
        this.samaReportLoading = false;
        this.firstTime = false;
        this.isSearch = false;
        this.chartData = {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: []
            }
          ]
        };
        if (data.data.samaReports != null) {
          data.data.samaReportStatistics.forEach(stat => {
            this.chartData.labels.push(stat.insuranceCompanyName);
            this.chartData.datasets[0].data.push(stat.count);
            this.chartData.datasets[0].backgroundColor.push(randomColor());
          });

          const datalabels = ChartDataLabels;
          this.options = {
            legend: {
              position: 'left'
            },
            plugins: {
              datalabels: {
                formatter: (value, ctx) => {
                  let sum = 0;
                  const dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map(input => {
                    sum += input;
                  });
                  const percentage = (value * 100 / sum).toFixed(2) + '%';
                  return percentage;
                },
                color: '#faf3f6'
              }
            }
          };
        }
      }, (error: any) => {
        this.samaReportLoading = false;
        this.firstTime = false;
        this.isSearch = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      });
  }
  exportCsv() {
    this.setFilterTimeZone();
    this._insuranceCompanyService.exportSamaReportAsExcel(this.samaFilter).subscribe((data) => {
      if (data.data) {
        FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
          'SamaReport.xlsx');
      }
    });
  }

  setFilterTimeZone() {
    // Set Timezone
    if (this.samaFilter.invoiceDateFrom) {
      this.samaFilter.invoiceDateFrom.setHours(
        this.samaFilter.invoiceDateFrom.getHours() - this.samaFilter.invoiceDateFrom.getTimezoneOffset() / 60);
    }
    if (this.samaFilter.invoiceDateTo) {
      this.samaFilter.invoiceDateTo.setHours(
        this.samaFilter.invoiceDateTo.getHours() - this.samaFilter.invoiceDateTo.getTimezoneOffset() / 60);
    }

    if (this.samaFilter.driverBirthDateFrom) {
      this.samaFilter.driverBirthDateFrom.setHours(
        this.samaFilter.driverBirthDateFrom.getHours() - this.samaFilter.driverBirthDateFrom.getTimezoneOffset() / 60);
    }
    if (this.samaFilter.driverBirthDateTo) {
      this.samaFilter.driverBirthDateTo.setHours(
        this.samaFilter.driverBirthDateTo.getHours() - this.samaFilter.driverBirthDateTo.getTimezoneOffset() / 60);
    }
  }

}
