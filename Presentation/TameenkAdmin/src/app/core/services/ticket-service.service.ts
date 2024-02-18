import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { TicketFiltrationModel } from '../../ticket/ticket-filtration-model';
import { Observable } from 'rxjs';
import { CommonResponse, IIdNamePairModel } from '..';
import { TicketsListingModel } from '../../ticket/tickets-listing-model';
import { TicketHistory } from '../../ticket/ticket-history';
import { GeneratePolicyRes } from '../.././policies/generate/generate-policy';
import { TicketLog } from '../../ticket/ticket-log';
import { OutputModel } from '../models/output-model';
import { CreatedTicketOutput } from 'src/app/ticket/created-ticket-output';
import { AttachedFiles } from 'src/app/ticket/ticket-attachment-model';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService extends ApiService {

  public ticketFilter: TicketFiltrationModel = new TicketFiltrationModel();

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'ticket/';
  }

  getTicketType(lang: string): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('all-types', `lang=${lang}`);
  }

  getTicketStatus(lang: string): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('all-status', `lang=${lang}`);
  }

  getAllTicketsWithFilter(body, params): Observable<CommonResponse<TicketsListingModel[]>> {
    return super.post<CommonResponse<TicketsListingModel[]>>('all', body, params);
  }

  getExcelWithFilter(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('excel', body);
  }

  getTicketDetails(id: number): Observable<CommonResponse<TicketsListingModel>> {
    return super.get<CommonResponse<TicketsListingModel>>('details', `id=${id}`);
  }

  getTicketHistory(id: Number): Observable<CommonResponse<TicketHistory[]>> {
    return super.get<CommonResponse<TicketHistory[]>>('all-histories', `id=${id}`);
  }

  UpdateTickeStatus(body, params) {
    return super.post<CommonResponse<OutputModel>>('UpdateStatus', body, params);
  }

  getAllLogsWithFilter(body, params): Observable<CommonResponse<TicketLog[]>> {
    return super.post<CommonResponse<TicketLog[]>>('all-log', body, params);
  }

  getLogExcelWithFilter(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('excel-log', body);
  }
  createTicket(body){
    return super.post<CommonResponse<CreatedTicketOutput>>('createTicket', body);
  }
  downloadTicketAttachmentFile(attachmentId: number): Observable<CommonResponse<AttachedFiles>> {
    return super.get<CommonResponse<AttachedFiles>>('downloadTicketAttachmentFile', `attachmentId=${attachmentId}`);
  }
  deleteUserTicketHistory(historyId: number):Observable<CommonResponse<OutputModel>>{
    return super.get<CommonResponse<OutputModel>>('deleteUserTicketHistory', `historyId=${historyId}`);
  }
}
