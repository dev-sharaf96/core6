import { Component, OnInit, Input } from '@angular/core';
import { InquiryService, CommonResponse, Inquiry } from 'src/app/core';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  @Input() quotationRequestId;
  vehicleInfo: Inquiry;
  constructor(private _inquiryService: InquiryService) { }

  ngOnInit() {
    this._inquiryService.getQuotationRequest(this.quotationRequestId).subscribe((data: CommonResponse<Inquiry>) => {
      this.vehicleInfo = data.data;
    }, error => error);
  }
}
