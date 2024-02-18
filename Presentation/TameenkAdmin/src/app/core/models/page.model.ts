export class Page {
  Id: number;
  Title: string;
  TitleEn: string;
  RouteName: string;
  IconName: string;
  Order: number;
  ParentId: number;
  IsActive: boolean;
  RoleId: number;
  constructor() {
    this.ParentId = null;
  }
}
