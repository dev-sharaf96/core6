import { Component, OnInit } from '@angular/core';
import { InquiryService, CommonResponse, IUserAddress, AuthService } from 'src/app/core';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
addresses: IUserAddress[];
totalCount: number;
loading = false;
  constructor(private _inquiryService: InquiryService, private _authService: AuthService) { }
  ngOnInit() {
    this.getUserAddresses();
  }
  getUserAddresses(paging?) {
    this.loading = true;
    this._inquiryService.getUserAddresses(this._authService.getUserId(), paging).subscribe((data: CommonResponse<IUserAddress[]>) => {
    this.loading = false;
      this.addresses = data.data;
      this.totalCount = data.totalCount;
    },
    (error: any) => error);
  }
}
