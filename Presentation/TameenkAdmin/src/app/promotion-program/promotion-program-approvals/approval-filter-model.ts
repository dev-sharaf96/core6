export class ApprovalFilterModel {
  nin: string;
  email: string;
  startDate: Date;
  endDate: Date;
  status: number;
  lang: string;
  constructor(
    _nin?: string,
    _email?: string,
    _startDate?: Date,
    _endDate?: Date,
    _status?: number,
    _lang?: string
  ) {
    this.nin = _nin || null;
    this.email = _email || null;
    this.endDate = _endDate || null;
    this.startDate = _startDate || null;
    this.status = _status || null;
    this.lang = _lang || null;
  }
}
