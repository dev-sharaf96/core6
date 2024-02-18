import { data } from 'jquery';

export class PolicyStatisticsOutput {

    createdDateTime: Date;
    policyNo: string;
    insuredCity:string;
    selectedInsuranceTypeCode: number;
    vehicleBodyType:string;
    vehicleMaker:string;
    vehicleModel:string;
    modelYear:number;
    insuredId:string;
    insuredBirthDate:Date;
    insuredBirthDateH:string;
    genderId:number;
    driver1_DateOfBirthG:Date;
    driver1_GenderCode:number;
    driver2_DateOfBirthG:Date;
    driver2_GenderCode:number;
    priceTypeCode_7_Value:number;
    priceTypeCode_2_Value:number;
    priceTypeCode_2_Percentage:number;
    priceTypeCode_3_Value:number;
    priceTypeCode_3_Percentage:number;
    priceTypeCode_1_Value:number;
    priceTypeCode_1_Percentage:number;
    priceTypeCode_9_Value:number;
    priceTypeCode_9_Percentage:number;
    priceTypeCode_8_Value:number;
    priceTypeCode_8_Percentage:number;
    productPrice:number;
  }