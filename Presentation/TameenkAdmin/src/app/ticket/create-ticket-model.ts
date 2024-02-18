import { AttachedFiles } from "./ticket-attachment-model";

export class CreateTicketModel 
{
    ticketTypeId: number;
    sequenceOrCustomCardNumber : string;
    //userEmail: string;
    userPhone: string;
    userNotes: string;
    language: string;
    nin: string;
    attachedFiles :Array<AttachedFiles> = [];

    constructor(ticketTypeId?: number,
        sequenceOrCustomCardNumber? : string,
        userPhone?: string,
        userNotes?: string,
        language?: string,
        nin?: string)
    {
        this.userPhone = userPhone || '';
        this.ticketTypeId = ticketTypeId || null;
        this.userNotes = userNotes || '';
        this.sequenceOrCustomCardNumber = sequenceOrCustomCardNumber || '';
        this.language = language || 'ar';
        this.nin = nin || '';
    }
}

