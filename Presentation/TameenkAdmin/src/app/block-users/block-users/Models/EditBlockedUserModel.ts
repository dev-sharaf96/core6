export class EditBlockedUserModel{
    id: string;
    isBlocked: boolean;
    modifiedDate: Date;
    modifiedBy: string;
    lang: string;


constructor(
    id?: string,
    isBlocked?: boolean,
    modifiedDate?: Date,
    modifiedBy?:string,
    lang?:string
 ) {
   this.id = id || null;
   this.isBlocked = isBlocked || null;
   this.modifiedDate = modifiedDate || null;
   this.modifiedBy = modifiedBy || null;
   this.lang = lang || null;
 }
}
