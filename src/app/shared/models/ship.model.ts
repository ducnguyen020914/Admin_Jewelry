export interface IShip {
  service_id ?: number;
  insurance_value?:number;
  coupon?: string;
  from_district_id?:number;
  to_district_id?:number;
  to_ward_code?: string;
  height?:number;
  length?:number;
  weight?:number;
  width?:number;
}
export class Ship implements IShip{
constructor(
  public service_id ?: number,
  public insurance_value?:number,
  public coupon?: string,
  public from_district_id?:number,
  public to_district_id?:number,
  public to_ward_code?: string,
  public height?:number,
  public length?:number,
  public weight?:number,
  public width?:number
  ){
    this.service_id =service_id;
    this.insurance_value = insurance_value;
    this.coupon =coupon ;
    this.from_district_id = from_district_id;
    this.to_district_id = to_district_id;
    this.to_ward_code = to_ward_code;
    this.height = height;
    this.length =length;
    this.weight = weight;
    this.width = width;
  }
}
