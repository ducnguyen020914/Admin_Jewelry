export const ROUTER_ACTIONS = {
  create: 'create',
  update: 'update',
  detail: 'detail',
  view: 'view',
  delete: 'delete',
};

export const ROUTER_UTILS = {
  base: {
    home: '',
    dashboard: 'dashboard',
    freeRoute: '**',
  },
  authentication: {
    root: 'authentication',
    login: 'login',
  },
  appointment:{
    appointment:'appointment'
  },
  ticket: {
    root: 'ticket',
    create: 'create',
    createByComplaint: 'create-by-complaint/:id',
    detail: ':ticketId/detail',
  },
  survey: {
    root: 'survey',
    list: 'list',
    result: 'result',
    detailResult: 'result/:surveyId/detail/:type',
    create: 'create',
    update: ':id/update',
    detail: ':id/detail',
  },
  building: {
    root: 'building',
    list: 'list',
    detail: ':id/detail',
    create: 'create',
    unit: 'unit',
    unitCreate: 'unit/create',
    unitUpdate: 'unit/:unitId/update',
    unitDetail: 'unit/:unitId/detail',
  },
  partnerContract: {
    root: 'partner-contract',
  },
  customer: {
    list: 'list',
    root: 'customer',
    create: 'create',
    update: ':customerId/update',
    detail: ':id/detail',
  },
  statistical:{
    root:'',
    statistical:"statistical",
    statisticalTop:'statisticalTop'
  },
  notification: {
    root: 'notification',
    create: 'create/:type',
    update: ':notificationId/update/:type',
    detail: ':notificationId/detail/:type',
    me: 'me',
    list: 'list',
  },
  vendor: {
    root: 'vendor',
    detail: ':id/detail',
    list: 'list',
  },
  employee: {
    root: 'employee',
    list: 'list',
    detail: ':id',
  },

  department: {
    root: 'department',
    detail: `:id/${ROUTER_ACTIONS.detail}`,
  },
  contract: {
    root: 'contract',
    list: 'list',
    category: 'category',
    detail: `:id/${ROUTER_ACTIONS.detail}`,
    contractUpdate: ':id/update',
    contractCreate: 'create',
  },
  order: {
    root: 'order',
    orderList: 'list',
    orderListExchange: 'list/exchange',
    repurchaseOrder: 'list/repurchase',
    repurchase:'repurchase',
    orderExchange: ':id/exchange',
    repurchaseExchange: ':id/repurchaseCreate',
    orderExchangeDetail:":id/exchange-detail",
    orderUpdate: ':id/update',
    orderDetail: ':id/detail',
    orderCreate: 'create',
    exchange:"exchange",
    repurchaseCreate:'repurchase/create',
    updateWaitOrder:":id/updatewait",
    detailrepurchase:':id/detail-repurchase'
    
  },
  user:{
    root:"user",
    list:"list",
    employee:'employee',
    customer:'customer',
    userCreate: 'create',
  },
  setting: {
    root: 'setting',
    user: 'user',
    userCreate: 'user/create',
    userUpdate: 'user/:id/update',
    myProfile: 'my-profile',
    groupUser: 'group-user',
    groupUserDetail: 'group-user/:id/detail',
    role: 'role',
    department: 'department',
    client: 'client',
    detail: 'department/:id/detail',
    actionLog: 'action-log',
    actionLogDetail: 'action-log/:id/detail',
    configuration: {
      root: 'parameter',
      list: 'parameter/list',
    },
  },
  product: {
    root: 'product',
    productList: 'list',
    material:'material',
    category: 'category',
    categoryUpdate: 'category/:id/update',
    categoryDetail: 'category/:id/detail',
    materialDetail: 'material/:id/detail',
    categoryCreate: 'category/create',
    accessory:'accessory',
    vendor:'vendor',
    productCreate: 'create',
    productUdate: ':id/update',
    productProcess:"processed"
  },
  room: {
    root: 'room',
    roomCalendar: 'room/:id/calendar',
    calendar: 'calendar',
  },
  privacyPolicy: {
    root: 'privacy-policy',
  },
  report: {
    root: 'report',
  },
  feedback: {
    public: 'feedback-public',
  },
  home: {
    root: 'home',
  },
  complaint: {
    root: 'complaint',
    list: 'list',
    detail: ':id/complaint-detail',
    qrCreate: 'create-qr',
    qrUpdate: ':id/qr-update',
    qrList: 'qr-list',
    report: 'report',
  },
  error: {
    notFound: '404',
    permissionDenied: '403',
    systemError: '500',
  },
  guest: {
    root: 'guest',
    list: 'list',
    detail: ':id/detail',
    register: 'register',
    registerCreate: 'create-register',
    registerUpdate: ':id/update-register',
    registerDetail: ':id/detail-register',
  },
};
