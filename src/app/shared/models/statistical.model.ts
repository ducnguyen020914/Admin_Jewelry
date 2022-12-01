export class Revenue {
  constructor(
    public month: number,
    public total: number,
    public quantity: number
  ) {
    this.month = month;
    this.total = total;
    this.quantity = quantity;
  }
}

export class SatisticalCategory {
  constructor(public name: string, public quantity: number) {
    (this.name = name), (this.quantity = quantity);
  }
}
export class IcategoryStatistical{
 constructor(public name:string,
             public value:number){
              this.name = name;
              this.value = value;
             }
}
