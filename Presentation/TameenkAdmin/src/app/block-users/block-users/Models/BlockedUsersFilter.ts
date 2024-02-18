export class BlockedUsersFilter {
    id: string;
    nationalId: string;
    isBlocked: boolean;
    isExport: boolean;
    pageIndex: number;
    pageSize: number;
    lang: string;

      constructor(
        id?: string,
        nationalId?: string,
        isBlocked?: boolean,
        isExport?: boolean,
        pageIndex?: number,
        pageSize?: number,
        lang?: string
      ) {
        this.id = id || '';
        this.nationalId = nationalId || '';
        this.isBlocked = isBlocked || false;
        this.isExport = isExport || false;
        this.pageIndex = pageIndex || null;
        this.pageSize = pageSize || null;
        this.lang = lang || null;
      }
  }
