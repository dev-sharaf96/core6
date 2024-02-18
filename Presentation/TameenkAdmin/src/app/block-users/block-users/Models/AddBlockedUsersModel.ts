export class AddBlockedUsersModel{
  nationalId: string;
  lang: string;
  blockReason: string;
constructor(
  nationalId?: string,
  lang?: string,
  blockReason?: string
) {
 this.nationalId = nationalId || null;
 this.lang = lang || null;
   this.blockReason = blockReason || null;
}
}
