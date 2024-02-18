import { Component, OnInit } from '@angular/core';
import { InsuranceCompanyService, IIdNamePairModel } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-insurance-company',
  templateUrl: './test-insurance-company.component.html',
  styleUrls: ['./test-insurance-company.component.css']
})
export class TestInsuranceCompanyComponent implements OnInit {

  insuranceCompany: IIdNamePairModel[];
  insuranceTypes: IIdNamePairModel[] = [{ id: 1, name: 'ضد الغير' }, { id: 2, name: 'شامل' }];
  selectedCompanyId = 0;
  selectedInsuranceType = 0;
  constructor(private insuranceCompanyService: InsuranceCompanyService) { }

  ngOnInit() {
    this.insuranceCompanyService.getInsuranceCompaniesName().subscribe(data => {
      this.insuranceCompany = data.data;
    });
  }

  selectCompany(companyId: number) {
    this.selectedCompanyId = +companyId;
  }

  selectInsuranceType(insuranceType: number) {
    this.selectedInsuranceType = +insuranceType;
  }

  testQuotation() {
    if (!this.selectedInsuranceType) {
      alert('Please Select Insurance Type');
      return;
    }

    if (!this.selectedCompanyId) {
      alert('Please Select Insurance Company');
      return;
    }

    this.insuranceCompanyService.testInsuranceCompanyQuotation(this.selectedCompanyId, this.selectedInsuranceType).subscribe(() => {
      window.open(`${environment.quotationApiUrl}DownloadQuotationAutomatedTestExcelSheet`, '_blank');
    });
  }

  testPolicy() {
    if (!this.selectedInsuranceType) {
      alert('Please Select Insurance Type');
      return;
    }

    if (!this.selectedCompanyId) {
      alert('Please Select Insurance Company');
      return;
    }
    this.insuranceCompanyService.testInsuranceCompanyQuotation(this.selectedCompanyId, this.selectedInsuranceType).subscribe(() => {
      this.insuranceCompanyService.testInsuranceCompanyPolicy(this.selectedCompanyId, this.selectedInsuranceType).subscribe(() => {
        window.open(`${environment.quotationApiUrl}DownloadQuotationAutomatedTestExcelSheet`, '_blank');
        window.open(`${environment.quotationApiUrl}DownloadPolicyAutomatedTestExcelSheet`, '_blank');
      });
    });
  }
}
