import * as FileSaver from 'file-saver';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonResponse, LocalizationService } from '../../core';
import { Component, OnInit, Output } from '@angular/core';

import { AttachedFiles } from '../ticket-attachment-model';
import { TicketHistory } from '../ticket-history';
import { TicketServiceService } from '../../core/services/ticket-service.service';
import { TicketsListingModel } from '../tickets-listing-model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  ticket: TicketsListingModel = new TicketsListingModel();
  //ticketAction: TicketHistory = new TicketHistory();
  ticketAction: Array<TicketHistory> = new Array<TicketHistory> (); 
  ticketId;
  ticketReplay:any;
  isEdit:boolean;
  loading: boolean;
  eventHolder;
  ticketHistories: TicketHistory[];
  ticketHistoryCount;
  emptyStringValue = 'ــــــــــــــــــ';
  showAction = false;
  clicked = false;
  isEnglish: boolean;
  isClosed = false;
  messageText:string;

  constructor(
    private _ticketService: TicketServiceService,
    private _router: Router,
    private route: ActivatedRoute,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
    private _translate: TranslateService) { }

    ngOnInit() {
      this.ticketId = this.route.snapshot.paramMap.get('ticketId');
      this._ticketService.getTicketDetails(this.ticketId).subscribe(data => {
      this.ticket = data.data;
      this.showAction = (this.ticket.statusNameAr.includes('تم غلق التذكرة')) ? false : true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  this.ticketAction = new Array<TicketHistory>();
    });
  }

  HistoriesLoad(event) {
    this.loading = true;
    this.eventHolder = event;
    this._ticketService.getTicketHistory(this.ticketId).subscribe((data: CommonResponse<TicketHistory[]>) => {
          this.ticketHistories = data.data;
          this.ticketHistoryCount = data.data.length;
          this.loading = false;
        },
        (error: any) => {
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }

  onCheckboxChagen(event) {
    console.log('onCheckboxChagen --> event');
    console.log(event);
    this.isClosed = (event.target.checked) ? true : false;
  }

  DownloadAttachment(attachmentId){
    this._ticketService.downloadTicketAttachmentFile(attachmentId).subscribe(data=> {
        if (data.data) {
          if(data.data.extension == 'pdf'){
            FileSaver.saveAs('data:application/pdf;base64,' + data.data.file, attachmentId + '.pdf');
          }
          else{
            FileSaver.saveAs('data:image/png;base64,' + data.data.file, attachmentId + '.png');
          } 
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

  onSubmit() {
    this.clicked = true;
    let  selectedTicketDetails: TicketHistory=new TicketHistory();
    selectedTicketDetails.id= this.ticketId
    selectedTicketDetails.adminReply=this.ticketReplay;
    this.ticketAction.push(selectedTicketDetails)
    this._ticketService.UpdateTickeStatus(this.ticketAction, `isClosed=${this.isClosed}`).subscribe(data => {
      if (data.data.errorCode === 1) {
        this._toastrService.success(data.data.errorDescription);
        this.showAction = !this.isClosed;
        this.HistoriesLoad(this.eventHolder);
        // this._router.navigate(['/admin/tickets']);
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

  deleteUserTicketHistory(historyId) {
    this._translate.get('common.confirm').subscribe(res => {
      this.messageText = res;
    });
    if(confirm(this.messageText)){
    this._ticketService.deleteUserTicketHistory(historyId)
      .subscribe(data => {
        if (data.data.errorCode == 1) {
          this._translate.get('common.deleteDone').subscribe(res => {
            this.HistoriesLoad(this.eventHolder);
            this._toastrService.success(res);
          });
        }
        else {
          this._translate.get('common.deleteFailed').subscribe(res => {
            this._toastrService.error(res);
          });
        }
      },
        (error: any) => {
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
      }
  }
}
