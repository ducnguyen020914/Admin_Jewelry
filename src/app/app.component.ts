import { Component, Input } from '@angular/core';
import { ROUTER_UTILS } from './router.utils';
import { SidebarConstant } from './sidebar.contant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() isCollapsed = false;
  sidebar = SidebarConstant;

  ROUTER_UTILS = ROUTER_UTILS;
  constructor() {}

}
