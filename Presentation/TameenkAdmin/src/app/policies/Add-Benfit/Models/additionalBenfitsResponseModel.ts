import { Benfit } from "./Benfit";

export class additionalBenfitsResponseModel {
    errorCode:number;
    errorDescription:string;
    referenceId: string;
    benefits : Benfit[];
        constructor(
            referenceId?: string,
            benefits?: Benfit[],
            errorCode?:number,
            errorDescription?:string
        ) {
          this.referenceId = referenceId || null;
          this.benefits = benefits || null;
          errorCode=errorCode||null;
          errorDescription=errorDescription||null;

        }
    }