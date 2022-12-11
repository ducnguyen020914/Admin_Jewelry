import { PERMISSION_CONSTANT } from '@shared/constants/Permisstion.constant';
import { ROUTER_UTILS } from '@shared/utils/router.utils';
import { LocalStorageService } from 'ngx-webstorage';

export const SidebarConstant = [
  {
    path: ROUTER_UTILS.base.dashboard,
    title: 'sidebar.dashboard',
    icon: 'appstore',
    root: true,
    admin:true
  },
  {
    path: ROUTER_UTILS.order.root,
    title: 'sidebar.order',
    icon: 'shopping',
    submenu: [
      {
        path: `${ROUTER_UTILS.order.root}/${ROUTER_UTILS.order.orderList}`,
        title: 'sidebar.order',
        root: true,
        admin:true
      },
      {
        path: `${ROUTER_UTILS.order.root}/${ROUTER_UTILS.order.exchange}`,
        title: 'sidebar.exchange',
        root: true,
        admin:true
      },
      {
        path: `${ROUTER_UTILS.order.root}/${ROUTER_UTILS.order.repurchase}`,
        title: 'sidebar.purchase',
        root: true,
        admin:true
      }
    ]
  },
  {
    path: ROUTER_UTILS.appointment.appointment,
    title: 'sidebar.appointment',
    icon: 'calendar',
    root: true,
    admin:true,
  },
  {
    path: ROUTER_UTILS.product.productList,
    title: 'sidebar.product',
    icon: 'shop',
    submenu: [
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.productList}`,
        title: 'sidebar.product',
        root: true,
        admin:true
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.productProcess}`,
        title: 'sidebar.productProcessed',
        root: true,
        admin:true
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.category}`,
        title: 'sidebar.category',
        root: true,
        admin:true
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.material}`,
        title: 'sidebar.material',
        root: true,
        admin:true
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.accessory}`,
        title: 'sidebar.accessory',
        root: true,
        admin:true
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.vendor}`,
        title: 'sidebar.vendor',
        root: true,
        admin:true
      }

    ]
  },
  {
    path: ROUTER_UTILS.user.root,
    title: 'sidebar.user',
    icon: 'user',
    submenu: [
      {
        path: `${ROUTER_UTILS.user.root}/${ROUTER_UTILS.user.employee}`,
        title: 'sidebar.employee',
        root: true,
        admin:localStorage.getItem('isadmin') === 'true' ? true : false
      },
      {
        path: `${ROUTER_UTILS.user.root}/${ROUTER_UTILS.user.customer}`,
        title: 'sidebar.customer',
        root: true,
        admin:true
      }
    ]
  },
  {
    path: ROUTER_UTILS.statistical.root,
    title: 'sidebar.statistical',
    icon: 'bar-chart',
    admin: localStorage.getItem('isadmin') === 'true' ? true : false,
    submenu: [
      {
        path: `${ROUTER_UTILS.statistical.statistical}`,
        title: 'sidebar.statisticaldoanhthu',
        root: true,
        admin:localStorage.getItem('isadmin') === 'true' ? true : false
      },
      {
        path: `${ROUTER_UTILS.statistical.statistical}/${ROUTER_UTILS.statistical.statisticalTop}`,
        title: 'sidebar.statisticalTop',
        root: true,
        admin:localStorage.getItem('isadmin') === 'true' ? true : false
      }
    ]
  },
];
