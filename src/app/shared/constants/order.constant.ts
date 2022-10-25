export const TO_PAY = 'TO_PAY';
export const TO_SHIP = 'TO_SHIP';
export const TO_RECEIVE = 'TO_RECEIVE';
export const COMPLETED = 'COMPLETED';
export const CANCELLED = 'CANCELLED';
export const RETURN_REFUND = 'RETURN_REFUND';

export const ORDER_STATUS = [
  {value: TO_PAY, label: 'model.order.status.to_pay'},
  {value: TO_SHIP, label: 'model.order.status.to_ship'},
  {value: TO_RECEIVE, label: 'model.order.status.to_receive'},
  {value: COMPLETED, label: 'model.order.status.completed'},
  {value: CANCELLED, label: 'model.order.status.cancelled'},
  {value: RETURN_REFUND, label: 'model.order.status.return_refund'},
  ]

export const EXCHANGE_REQUEST = 'EXCHANGE_REQUEST';
export const TO_SHIP_EXCHANGE = 'TO_SHIP_EXCHANGE';
export const REQUEST_RECEIVED = 'REQUEST_RECEIVED';
export const REFUSE_EXCHANGE = 'REFUSE_EXCHANGE';
export const RECEIVED_AND_IMPORTED = 'RECEIVED_AND_IMPORTED';

export const EXCHANGE_STATUS = [
  {value: EXCHANGE_REQUEST, label: 'model.exchange.status.exchangeRequest'},
  {value: TO_SHIP_EXCHANGE, label: 'model.exchange.status.to_ship'},
  {value: REQUEST_RECEIVED, label: 'model.exchange.status.requestReceived'},
  {value: REFUSE_EXCHANGE, label: 'model.exchange.status.refuseExchange'},
  {value: RECEIVED_AND_IMPORTED, label: 'model.exchange.status.receivedAndImported'},
]
