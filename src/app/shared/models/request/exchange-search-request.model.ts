import { ExchangeEnum } from '../exchange.model';
export interface IExchangeSearchRequest{
    orderId?:string;

    status?:ExchangeEnum;

    keyword?:string;

    startDate?: Date | string;

    endDate?:Date | string;

    pageIndex?:number;

    pageSize?:number;

    sortBy?:string;
}