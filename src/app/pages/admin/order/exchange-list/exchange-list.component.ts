import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {ORDER_TYPE, SORT} from "@shared/constants/common.constant";
import {EXCHANGE_STATUS, ORDER_STATUS} from "@shared/constants/order.constant";
import firebase from "firebase/compat";
import User = firebase.User;
import {IUser} from "@shared/models/user.model";
import {Exchange} from "@shared/models/exchange.model";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/utils/router.utils';
import { IExchangeSearchRequest } from '../../../../shared/models/request/exchange-search-request.model';
import { PAGINATION } from '../../../../shared/constants/pagination.constants';
import { ExchangeService } from '../../../../shared/services/order/exchange.service';
import CommonUtil from '../../../../shared/utils/common-utils';
import { ExchangeEnum } from '../../../../shared/models/exchange.model';
import * as moment from 'moment';

@Component({
  selector: 'app-exchange-list',
  templateUrl: './exchange-list.component.html',
  styleUrls: ['./exchange-list.component.scss']
})
export class ExchangeListComponent implements OnInit {
  exchangeSearchRequest:IExchangeSearchRequest={};
  pageIndex=PAGINATION.PAGE_DEFAULT;
  pageSize=PAGINATION.SIZE_DEFAULT;
  total = 0;
  formSearchExchange:FormGroup =new FormGroup({});
  EXCHANGE_STATUS = EXCHANGE_STATUS;
  types = ORDER_TYPE;
  ROUTER_UTILS = ROUTER_UTILS;
  users : IUser[] =[];
  exchanges:Exchange[] = [];
  isCallFirstRequest = false;
  isFirstFetch = false;
  constructor(private router:Router,
              private fb:FormBuilder,
              private exchangeService:ExchangeService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData(this.pageIndex,this.pageSize);
   
  }
  searchUsers(): void {
    this.exchangeSearchRequest.keyword = this.formSearchExchange.value.keyword;
  }
  initForm():void{
    this.formSearchExchange = this.fb.group({
      keyword:[''],
      status:[null],
      startDate: [this.exchangeSearchRequest.startDate || null],
      endDate: [this.exchangeSearchRequest.endDate || null],
      
    })
  }

  loadData(pageIndex:number,pageSize:number,sortBy?:string){
    this.exchangeSearchRequest.pageIndex = pageIndex;
    this.exchangeSearchRequest.pageSize = pageSize;
    this.exchangeSearchRequest.sortBy=sortBy;
    this.exchangeService.search(this.exchangeSearchRequest).subscribe((res:any)=>{
      console.log(res);
      this.exchanges = res.body?.data?.data;
      this.total = res.body?.data.page.total
    })
  }
  onChangeCreateDate(rangeDate: { fromDate?: Date; toDate?: Date }): void {
    this.formSearchExchange.get('startDate')?.setValue(rangeDate.fromDate);
    this.formSearchExchange.get('endDate')?.setValue(rangeDate.toDate);
  }

  resetSearch(): void {
    this.formSearchExchange.reset();
    this.search();
  }

  search(): void {
    this.exchangeSearchRequest.keyword =  this.formSearchExchange.get('keyword')?.value;
    this.exchangeSearchRequest.status =  this.formSearchExchange.get('status')?.value;
    const endCreatedAt = this.formSearchExchange.get('endDate')?.value;
    const startCreatedAt = this.formSearchExchange.get('startDate')?.value;
    if (startCreatedAt) {
      this.exchangeSearchRequest.startDate = moment(startCreatedAt).format('yyyy/MM/DD');
    } else {
      this.exchangeSearchRequest.startDate = '';
    }
    if (endCreatedAt) {
      this.exchangeSearchRequest.endDate = moment(endCreatedAt).format('yyyy/MM/DD');
    } else {
      this.exchangeSearchRequest.endDate = '';
    }
    console.log(this.exchangeSearchRequest);
    this.loadData(this.pageIndex,this.pageSize);
    
  }
  getStatus(status:ExchangeEnum): string{
    if(status === ExchangeEnum.HUY){
      return 'Đã hủy';
    }else if(status === ExchangeEnum.XAC_NHAN){
      return 'Xác nhận';
    }else if(status === ExchangeEnum.CHO_XAC_NHAN){
      return 'Chờ xác nhận';
    }else{
      return 'Thành công';
    }
  }
  getColor(status:ExchangeEnum): string{
    if(status === ExchangeEnum.HUY){
      return 'badge-danger';
    }else if(status === ExchangeEnum.XAC_NHAN){
      return 'badge-success';
    }else if(status === ExchangeEnum.CHO_XAC_NHAN){
      return 'badge-warning';
    }else{
      return 'badge-info';
    }
  }
  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.exchangeSearchRequest.pageIndex,
      this.exchangeSearchRequest.pageSize
    );
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.exchangeSearchRequest.pageIndex = pageIndex;
    this.exchangeSearchRequest.pageSize = pageSize;

    this.loadData(pageIndex,pageSize);
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    if (this.isFirstFetch) {
      this.isFirstFetch = false;
      return;
    }

    const { pageIndex, pageSize, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    let sortBy = '';
    if (sortField && sortOrder) {
      sortBy = `${sortField}.${
        sortOrder === SORT.ASCEND ? SORT.ASC : SORT.DESC
      }`;
    } else {
      sortBy = '';
    }
    this.exchangeSearchRequest.sortBy = sortBy;
    this.loadData(pageIndex,pageSize,sortBy);
  }

  create(): void {
    this.router.navigate([
      this.ROUTER_UTILS.order.root,
      this.ROUTER_UTILS.order.orderList,'exchange'
    ])
  }
  detail(id:string){
    this.router.navigate([
      this.ROUTER_UTILS.order.root,
      id,
      'exchange-detail'
    ])
  }

}
