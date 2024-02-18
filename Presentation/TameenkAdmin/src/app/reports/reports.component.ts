import { AdminPolicyService, CommonResponse, IIdNamePairModel, IPolicy, IReportsFilter, InsuranceCompanyService, LocalizationService, PolicyService, VehicleService } from '../core';
import { Component, OnInit } from '@angular/core';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SamaReport } from '../finance/sama-report';
import { SamaReportFilter } from '../finance/sama-report-filter';
import { SamaReportResult } from '../finance/sama-report-result';
import { SuccessFilter } from '../policies/success-policies/success-filter';
import { SuccessPolicies } from '../policies/success-policies/success-policies';
import { ToastrService } from 'ngx-toastr';
import randomColor from 'randomcolor';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  policiesFilter: SuccessFilter;
  SuccessPoliciesCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'policyNo';
  isEnglish: boolean;
  selectedPolicy;
  samaReportLoading: boolean;
  samaReportData: SamaReport[];
  samaReportDataCount: number;
  chartData;
  options;
  today: any;
  isSearch = false;

  /**
   * @constructor Creates an instance of ReportsComponent.
   * @memberof ReportsComponent
   */
  constructor(private _adminPolicyService: AdminPolicyService,
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService, private _policyService: PolicyService,
    private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.samaReportLoading = true;
    this.policiesFilter = this._adminPolicyService.successFilter;
    this.policiesFilter.startDate = this.today;
    this.policiesFilter.endDate = this.today;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  }

  filterClick() {
    // Set Timezone
    // Set Timezone
    this.isSearch = true;
    if (this.policiesFilter.startDate) {
      this.policiesFilter.startDate.setHours(
        this.policiesFilter.startDate.getHours() - this.policiesFilter.startDate.getTimezoneOffset() / 60);
    }
    if (this.policiesFilter.endDate) {
      this.policiesFilter.endDate.setHours(
        this.policiesFilter.endDate.getHours() - this.policiesFilter.endDate.getTimezoneOffset() / 60);
    }

    this.samaReportLoading = true;
    this._adminPolicyService.getIncomeReportWithFilter(this.policiesFilter)
      .subscribe((data: CommonResponse<SamaReportResult>) => {
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
  validate() {
    // if (this.reportFilter.byAgeFrom > this.reportFilter.byAgeTo)
    //   this._toastrService.error('Age from must be less than or equal to age to.', 'Validation error');
  }

}
