export const TO_PAY = 'TO_PAY';
export const TO_SHIP = 'TO_SHIP';
export const TO_RECEIVE = 'TO_RECEIVE';
export const COMPLETED = 'COMPLETED';
export const CANCELLED = 'CANCELLED';
export const RETURN_REFUND = 'RETURN_REFUND';

export const ORDER_STATUS = [
  {value: 'HOA_DON_CHO', label: 'Hóa đơn chờ'},
  {value: 'CHO_XAC_NHAN', label: 'model.order.status.to_pay'},
  {value: 'XAC_NHAN', label: 'model.order.status.to_ship'},
  {value: 'DANG_GIAO', label: 'model.order.status.to_receive'},
  {value: 'DA_GIAO', label: 'model.order.status.completed'},
  {value: 'HUY', label: 'model.order.status.cancelled'},
  ]
  
  export const paymentMethod = [
    {value: 'MONEY', label: 'model.order.paymentMethod.money'},
    {value: 'CARD', label: 'model.order.paymentMethod.card'},
    
    ]
export const EXCHANGE_REQUEST = 'EXCHANGE_REQUEST';
export const TO_SHIP_EXCHANGE = 'TO_SHIP_EXCHANGE';
export const REQUEST_RECEIVED = 'REQUEST_RECEIVED';
export const REFUSE_EXCHANGE = 'REFUSE_EXCHANGE';
export const RECEIVED_AND_IMPORTED = 'RECEIVED_AND_IMPORTED';

export const EXCHANGE_STATUS = [
  {value: 'CHO_XAC_NHAN', label: 'model.exchange.status.exchangeRequest'},
  {value: 'XAC_NHAN', label: 'model.exchange.status.requestReceived'},
  {value: 'THANH_CONG', label: 'model.exchange.status.receivedAndImported'},
  {value: 'HUY', label: 'model.exchange.status.refuseExchange'},
 
]
