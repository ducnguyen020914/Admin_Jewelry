import { PERMISSION_CONSTANT } from '@shared/constants/Permisstion.constant';
import { ROUTER_UTILS } from '@shared/utils/router.utils';

export const SidebarConstant = [
  {
    path: ROUTER_UTILS.base.dashboard,
    title: 'sidebar.dashboard',
    icon: 'appstore',
    root: true,
    authorities: [],
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
      },
      {
        path: `${ROUTER_UTILS.order.root}/${ROUTER_UTILS.order.refun}`,
        title: 'sidebar.refun',
        root: true,
      }
    ]
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
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.category}`,
        title: 'sidebar.category',
        root: true,
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.material}`,
        title: 'sidebar.material',
        root: true,
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.accessory}`,
        title: 'sidebar.accessory',
        root: true,
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.vendor}`,
        title: 'sidebar.vendor',
        root: true,
      }
      
    ]
  },
  {
    path: ROUTER_UTILS.user.root,
    title: 'sidebar.user',
    icon: 'user',
    submenu: [
      {
        path: `${ROUTER_UTILS.user.root}/${ROUTER_UTILS.user.list}`,
        title: 'sidebar.user',
        root: true,
      },
      {
        path: `${ROUTER_UTILS.user.root}/${ROUTER_UTILS.user.employee}`,
        title: 'sidebar.employee',
        root: true,
      },
      {
        path: `${ROUTER_UTILS.user.root}/${ROUTER_UTILS.user.customer}`,
        title: 'sidebar.customer',
        root: true,
      }
    ]
  },
  {
    path: ROUTER_UTILS.statistical.statistical,
    title: 'sidebar.statistical',
    icon: 'bar-chart',
    root: true,
    authorities: [],
  },
];
