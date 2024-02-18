import { BlockedUsers } from "./BlockedUsers";
import { EditBlockedUserModel } from "./EditBlockedUserModel";

export class AdministrationResponseOutput{
    ErrorDescription:string;
    ErrorCodes:number;
    ErrorCode:number;
    Result:EditBlockedUserModel;

constructor(
    ErrorDescription?: string,
    ErrorCodes?: number,
    ErrorCode?:number,
    Result?:EditBlockedUserModel,
  ) {
    this.ErrorDescription = ErrorDescription || null;
    this.ErrorCodes = ErrorCodes|| null;
    this.ErrorCode = ErrorCode|| null;
    this.Result = Result|| null;

  }
}

export class AdministrationResponseOutputList{
  data:dataList;
  errors:string;
  totalCount:number;
constructor(
  data?: dataList,
  errors?: string,
  totalCount?:number
) {
  this.data = data || null;
  this.errors = errors|| null;
  this.totalCount = totalCount|| null;
}

}
export class dataList{
  ExcelSheet:string;
  data:BlockedUsers[]
constructor(
  ExcelSheet?: string,
  data?: BlockedUsers[],

) {
  this.ExcelSheet = ExcelSheet || null;
  this.data = data|| null;
}

}
