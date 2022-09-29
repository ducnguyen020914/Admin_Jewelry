import { ROUTER_UTILS } from './router.utils';


export const SidebarConstant = [
  {
    path: ROUTER_UTILS.base.dashboard,
    title: 'sidebar.dashboard',
    icon: 'appstore',
    root: true,
    authorities: [],
  },
  {
    path: `${ROUTER_UTILS.employee.root}`,
    title: 'sideba',
    icon: 'user',
    root: false,
    authorities: ['department:view', 'employee:view'],
    submenu: [
      {
        path: `${ROUTER_UTILS.employee.root}/${ROUTER_UTILS.employee.list}`,
        title: 'Quản lý nhân viên',
        authorities: ['employee:view'],
      },
      {
        path: ROUTER_UTILS.department.root,
        title: 'sidebar.department',
        authorities: ['department:view'],
      },
    ],
  },
  {
    path: ROUTER_UTILS.meeting.root,
    title: 'sidebar.meeting',
    icon: 'calendar',
    root: false,
    authorities: ['meeting:view'],
    submenu: [
      {
        path: `${ROUTER_UTILS.meeting.root}/${ROUTER_UTILS.room.root}`,
        title: 'sidebar.room',
        authorities: ['room:view'],
      },
      {
        path: `${ROUTER_UTILS.meeting.root}/${ROUTER_UTILS.meeting.list}`,
        title: 'sidebar.meet',
        authorities: ['meeting:view'],
      },
      {
        path: `${ROUTER_UTILS.meeting.root}/${ROUTER_UTILS.meeting.calender}`,
        title: 'sidebar.calender',
        authorities: ['meeting:view'],
      },
    ],
  },
  {
    path: `${ROUTER_UTILS.guest.root}`,
    title: 'sidebar.guest',
    icon: 'user',
    authorities: ['guest:view'],
    root: false,
    submenu: [
      {
        path: `${ROUTER_UTILS.guest.root}/${ROUTER_UTILS.guest.list}`,
        title: 'sidebar.guest',
        root: true,
        authorities: ['guest:view'],
      },
      {
        path: `${ROUTER_UTILS.guest.root}/${ROUTER_UTILS.guest.register}`,
        title: 'sidebar.register',
        root: true,
        authorities: ['guest:view'],
      },
    ],
  },
  {
    path: `${ROUTER_UTILS.booking.root}`,
    title: 'sidebar.booking',
    icon: 'shop',
    root: false,
    submenu: [
      {
        path: `${ROUTER_UTILS.booking.root}/${ROUTER_UTILS.booking.product}`,
        title: 'sidebar.product',
        root: true,
        authorities: ['order:view', 'employee:view'],
      },
      {
        path: `${ROUTER_UTILS.booking.root}/${ROUTER_UTILS.booking.menu}`,
        title: 'sidebar.menu',
        root: true,
        authorities: ['order:view'],
      },
      {
        path: `${ROUTER_UTILS.booking.root}/${ROUTER_UTILS.booking.order}`,
        title: 'sidebar.order',
        root: true,
        authorities: ['order:view', 'employee:view'],
      },
    ],
  },
  {
    title: 'sidebar.notification',
    icon: 'bell',
    root: false,
    authorities: ['notification:view'],
    submenu: [
      {
        path: `${ROUTER_UTILS.notification.root}/${ROUTER_UTILS.notification.list}`,
        title: 'model.notification.title',
        // icon: 'tags',
        root: true,
        authorities: ['configuration:view'],
      },
      {
        path: `${ROUTER_UTILS.notification.root}/${ROUTER_UTILS.notification.me}`,
        title: 'model.notification.titleMe',
        // icon: 'tags',
        root: true,
        authorities: ['configuration:view'],
      },
    ],
  },
  {
    title: 'sidebar.contract',
    icon: 'book',
    root: false,
    authorities: ['contract:view'],
    submenu: [
      {
        path: `${ROUTER_UTILS.contract.root}/${ROUTER_UTILS.contract.list}`,
        title: 'model.contract.title',
        root: true,
        authorities: ['configuration:view'],
      },
      {
        path: `${ROUTER_UTILS.contract.root}/${ROUTER_UTILS.contract.category}`,
        title: 'model.contract.contractCategory',
        root: true,
        authorities: ['configuration:view'],
      },
    ],
  },
  {
    path: `${ROUTER_UTILS.vendor.root}/${ROUTER_UTILS.vendor.list}`,
    title: 'sidebar.vendor',
    icon: 'bank',
    root: true,
    authorities: ['vendor:view'],
    // submenu: [
    //   {
    //     path: `${ROUTER_UTILS.vendor.root}/${ROUTER_UTILS.vendor.list}`,
    //     title: 'model.vendor.title',
    //     // icon: 'tags',
    //     root: true,
    //     authorities: ['configuration:view'],
    //   },
    // {
    //   path: `${ROUTER_UTILS.vendor.root}/${ROUTER_UTILS.vendor.manufacture}`,
    //   title: 'model.vendor.titleManufacture',
    //   // icon: 'tags',
    //   root: true,
    //   authorities: ['configuration:view'],
    // },
    // ],
  },
  {
    title: 'sidebar.settings',
    icon: 'setting',
    root: false,
    authorities: ['user:view', 'role:view', 'department:view'],
    submenu: [
      {
        path: `${ROUTER_UTILS.setting.root}/${ROUTER_UTILS.setting.configuration.list}`,
        title: 'model.configuration.title',
        // icon: 'tags',
        root: true,
        authorities: ['configuration:view'],
      },
      {
        path: `${ROUTER_UTILS.setting.root}/${ROUTER_UTILS.setting.user}`,
        title: 'sidebar.user',
        authorities: ['user:view'],
      },
      {
        path: `${ROUTER_UTILS.setting.root}/${ROUTER_UTILS.setting.groupUser}`,
        title: 'sidebar.group-user',
        authorities: ['user:view'],
      },
      {
        path: `${ROUTER_UTILS.setting.root}/${ROUTER_UTILS.setting.role}`,
        title: 'sidebar.role',
        authorities: ['role:view'],
      },
      {
        path: `${ROUTER_UTILS.setting.root}/${ROUTER_UTILS.setting.client}`,
        title: 'sidebar.client',
        authorities: ['client:view'],
      },
    ],
  },
  // code

  {
    path: `${ROUTER_UTILS.product.root}`,
    title: 'sidebar.product',
    icon: 'shop',
    authorities: ['product:view'],
    root: false,
    submenu: [
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.productList}`,
        title: 'sidebar.product',
        root: true,
        authorities: ['product:view'],
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.category}`,
        title: 'sidebar.category',
        root: true,
        authorities: ['category:view'],
      },
      {
        path: `${ROUTER_UTILS.product.root}/${ROUTER_UTILS.product.manufacture}`,
        title: 'sidebar.manufacture',
        root: true,
        authorities: ['manufacture:view'],
      },
    ],
  },
];
