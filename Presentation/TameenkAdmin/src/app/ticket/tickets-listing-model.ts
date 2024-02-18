export class TicketsListingModel {
  id: number;
  userEmail: string;
  userPhone: string;
  checkoutEmail: string;
  checkoutPhone: string;
  userNotes: string;
  statusNameAr: string;
  statusNameEn: string;
  ticketTypeNameAr: string;
  ticketTypeNameEn: string;
  policyId: number;
  policyNo: string;
  invoiceId: number;
  invoiceNo: number;
  referenceId: string;
  nin: string;
  sequenceNumber: string;
  customCardNumber: string;
  createdBy: string;
  userId: string;
  userTicketAttachmentsBytes:string[];
  userTicketAttachmentsIds:number[];
  status: string;
  checked: boolean;
}
