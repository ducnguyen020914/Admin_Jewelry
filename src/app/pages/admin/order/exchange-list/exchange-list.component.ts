import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ORDER_TYPE} from "@shared/constants/common.constant";
import {EXCHANGE_STATUS, ORDER_STATUS} from "@shared/constants/order.constant";
import firebase from "firebase/compat";
import User = firebase.User;
import {IUser} from "@shared/models/user.model";
import {Exchange} from "@shared/models/exchange.model";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-exchange-list',
  templateUrl: './exchange-list.component.html',
  styleUrls: ['./exchange-list.component.scss']
})
export class ExchangeListComponent implements OnInit {
  formSearchExchange =new FormGroup({});
  types = ORDER_TYPE;
  users : IUser[] =[];
  exchanges: Exchange[] = [];
  exchangeStatus = EXCHANGE_STATUS;
  isCallFirstRequest = false;
  constructor() { }

  ngOnInit(): void {
  }
  searchUsers(keyword: string): void {
  }

  onChangeCreateDate(rangeDate: { fromDate?: Date; toDate?: Date }): void {
  }

  resetSearch(): void {
    this.formSearchExchange.reset();
    this.search();
  }

  search(): void {

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    if (this.isCallFirstRequest) {
      this.isCallFirstRequest = false;
      return;
    }
  }

  create(): void {

  }

}
