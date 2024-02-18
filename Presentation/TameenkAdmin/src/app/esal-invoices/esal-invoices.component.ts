import { Component, OnInit } from '@angular/core';
import { IEsalInvoice } from '../core/models/EsalInvoice.Model';
import { EsalInvoicesService } from '../core/services/esal-invoice.service';
import { IIdNamePairModel } from '../core';

@Component({
  selector: 'app-esal-invoices',
  templateUrl: './esal-invoices.component.html',
  styleUrls: ['./esal-invoices.component.css']
})
export class EsalInvoicesComponent implements OnInit {
  InvoiceNumber: string = "";
  SadadBillsNumber: string = "";
  ReferenceId: string = "";
  IsPaid: boolean | null = null;
  Records: IEsalInvoice[] = [];

  loading: boolean;

  PaymentStatuses: IIdNamePairModel[];
  PaymentStatus: IIdNamePairModel = { id: null, name: "All" };

constructor(private esalService: EsalInvoicesService) {
  this.PaymentStatuses =
  [
    { id: null, name: "All" },
    { id: true, name: "Paid" },
    { id: false, name: "Not Paid" }
  ];


}

ngOnInit() {
  this.loadSearchResult();
}


loadSearchResult() {
  this.loading = true;
  this.esalService.loadSearchResult(this.InvoiceNumber ? this.InvoiceNumber : null, this.SadadBillsNumber ? this.SadadBillsNumber : null, this.ReferenceId ? this.ReferenceId : null, this.PaymentStatus.id)
  .subscribe((invoices: any) => { this.Records = invoices.data; this.loading = false });

  }

}
