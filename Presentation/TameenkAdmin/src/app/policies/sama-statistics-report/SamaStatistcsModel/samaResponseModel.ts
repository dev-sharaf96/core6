import { AgeRanges } from "./AgeRanges";
import { Channels } from "./Channel";
import { PaymentMethod } from "./PaymentMethod";
import { TotalPolicesPerGender } from "./TotalPolicesPerGender";
import { totalInSystem } from "./totalInSystem";
import { totalPolicesPerCity } from "./totalPolicesPerCity";

export interface samaResponseModel {
  data: {
    TotalPolicesPerGenderModel?: TotalPolicesPerGender[];
    AllAgeRanges?: AgeRanges[];
    AllPaymentMethodModel?: PaymentMethod[];
    totalInSystemModel?: totalInSystem[];
    AllChannelModel?: Channels[];
    TotalIndividualPolicesPerCity?: totalPolicesPerCity[];
    TotalCorpratePolicesPerCity?: totalPolicesPerCity[];
  };
}
