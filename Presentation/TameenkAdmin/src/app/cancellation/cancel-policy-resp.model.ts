export class CancelPolicyResponse{
    ReferenceId:string;
    StatusCode:number;
    Errors:[];
    RefundAmount:number;
    CreditNoteFile:[];
    CreditNoteFileUrl:string;
    constructor(
        ReferenceId?: string,
        StatusCode?: number,
        Errors?:[],
        RefundAmount?:number,
        CreditNoteFile?:[],
        CreditNoteFileUrl?:string
      ) {
        this.ReferenceId = ReferenceId || null;
        this.StatusCode= StatusCode|| null;
        this.Errors=Errors|| null;
        this. RefundAmount =RefundAmount|| null;
        this.CreditNoteFile= CreditNoteFile|| null;
        this.CreditNoteFileUrl= CreditNoteFileUrl|| null;
      }
}
 