export class errors {
    Type: number;
    ErrorMessage: string;
    ErrorCode: number;
    constructor(
        Type?: number,
        ErrorMessage?: string,
        ErrorCode?: number,
    ) {
      this.Type = Type || null;
      this.ErrorMessage = ErrorMessage || null;
      this.ErrorCode = ErrorCode || null;
    }
  }