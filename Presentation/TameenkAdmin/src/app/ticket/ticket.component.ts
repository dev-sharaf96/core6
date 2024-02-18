import * as FileSaver from 'file-saver';

import { CommonResponse, LocalizationService } from '../core';
import { Component, OnInit } from '@angular/core';

import { TicketFiltrationModel } from './ticket-filtration-model';
import { TicketHistory } from './ticket-history';
import { TicketServiceService } from '../core/services/ticket-service.service';
import { TicketsListingModel } from './tickets-listing-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  selectedTickets: number[]=[];
  clicked: boolean;
  showAction;
  ticketReplay:string;
  openPpUp = false;
  isClosed: boolean=false;
  ticketFilter: TicketFiltrationModel = new TicketFiltrationModel();
  ticketAction: Array<TicketHistory> = new Array<TicketHistory> ();
  tickets: TicketsListingModel[];
  ticketsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  today = new Date();
  isSearch = false;

  constructor(
    private _ticketService: TicketServiceService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.ticketFilter.fromDate = this.today;
    this.ticketFilter.toDate = this.today;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  }

  filterClick(e) {
    this.isSearch = true;
    // Set Timezone
    if (this.ticketFilter.fromDate) {
      this.ticketFilter.fromDate.setHours(
        this.ticketFilter.fromDate.getHours() - this.ticketFilter.fromDate.getTimezoneOffset() / 60);
    }
    if (this.ticketFilter.toDate) {
      this.ticketFilter.toDate.setHours(
        this.ticketFilter.toDate.getHours() - this.ticketFilter.toDate.getTimezoneOffset() / 60);
    }
    e.reset();
  }

  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      if (this.ticketFilter.fromDate) {
        this.ticketFilter.fromDate.setHours(
          this.ticketFilter.fromDate.getHours() - this.ticketFilter.fromDate.getTimezoneOffset() / 60);
      }
      if (this.ticketFilter.toDate) {
        this.ticketFilter.toDate.setHours(
          this.ticketFilter.toDate.getHours() - this.ticketFilter.toDate.getTimezoneOffset() / 60);
      }
      this._ticketService.getExcelWithFilter(this.ticketFilter).subscribe((data) => {
        if (data.data) {
          FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
           'requests-Log.xlsx');
        }
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      });
    }
  }

  requestsLazyLoad(event) {
    this.loading = true;
    this.eventHolder = event;
    const lang = (this.isEnglish) ? 'En' : 'Ar';
    this._ticketService.getAllTicketsWithFilter(this.ticketFilter,
                                              `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&lang=${lang}`
        ).subscribe((data: CommonResponse<TicketsListingModel[]>) => {
          if (data.data.length > 0) {
            console.log(data.data);
            this.tickets = data.data;
            this.tickets.map(a=> {
              a.checked = a.status.includes('تم غلق التذكرة') ? true : false;
            })
          } else {
            this.tickets = [];
          }
          this.ticketsCount = data.totalCount;
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
        }, (error: any) => {
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        });
  }

onSubmit(event) {
  this.clicked = true;
  for (let item of this.selectedTickets) {
  let  selectedTicketDetails: TicketHistory=new TicketHistory();
  selectedTicketDetails.id=item
  selectedTicketDetails.adminReply=this.ticketReplay;
  this.ticketAction.push(selectedTicketDetails);
}
  this._ticketService.UpdateTickeStatus(this.ticketAction, `isClosed=${this.isClosed}`).subscribe(data => {
    if (data.data.errorCode === 1) {
      this._toastrService.success(data.data.errorDescription);
      this.showAction = !this.isClosed;
     // this.HistoriesLoad(this.eventHolder);
      // this._router.navigate(['/admin/tickets']);
      this.closeModal();
      this.requestsLazyLoad(event);
    } else {
      this._toastrService.error(data.data.errorDescription);
    }

    this.clicked = false;
  }, (error: any) => {
    if (error.errors) {
      error.errors.forEach(item => {
        this._toastrService.error(item.description, item.code);
      });
    }
  });
}

onCheckboxChange(event) {
  console.log('onCheckboxChagen --> event');
  console.log(event);
  this.isClosed = (event.target.checked) ? true : false;
}
showPopup(item) {
console.log(this.selectedTickets)
  this.openPpUp = true;
}

closeModal() {
  this.openPpUp = false;
  this.clicked = false;
  this.selectedTickets=[];
  this.ticketAction=new Array<TicketHistory>();
  this.isClosed=false;
}
}
