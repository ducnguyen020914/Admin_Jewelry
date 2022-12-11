import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { SidebarConstant } from './sidebar.constant';
import { Role } from '../../../shared/models/request/employee-request.model';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;
  sidebar = SidebarConstant;
  role = Role;
  isAdmin = false;
  ROUTER_UTILS = ROUTER_UTILS;
  constructor(private localStorage:LocalStorageService) {}

  ngOnInit(): void {
 
  }
}
