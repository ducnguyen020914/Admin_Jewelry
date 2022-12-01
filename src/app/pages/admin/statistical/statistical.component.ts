import { Component, OnInit,ViewChild} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Revenue, SatisticalCategory, IcategoryStatistical } from '../../../shared/models/statistical.model';
import { StatisticalService } from '../../../shared/services/statistical.service';
Chart.register(...registerables);
@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  max:number = 0;
  maxSL: number = 0;
  max2:number = 0;
  maxSL2: number = 0;
  constructor(private statisticalService:StatisticalService) { }
   curent:Array<number> = [];
  revenue:Revenue[] = [];
  revenue2:Revenue[] = [];
  category:SatisticalCategory[] = [];
  d = new Date().getFullYear();
  option:any;
  option1:any;
  option2:any;
  option0:any;
chart:any;
  ngOnInit(): void {  
    this.loadChartLine(new Date().getFullYear());
    this.loadYear();
    this.loadCategory();
    this.loadMaterial();
    this.loadChartLine2(new Date().getFullYear());
}
  loadChartLine(year:number){
    const params = {
      year:year,
      isRepurchase:false
    }
    this.statisticalService.revenue(params).subscribe((res:any) =>{
      this.revenue = res.body.data;
      console.log(this.revenue);
      this.revenue.forEach((data)=>{
        if(data.total > this.max){
          this.max = data.total;
        }
        if(data.quantity > this.maxSL){
          this.maxSL = data.quantity;
        }
      });
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: [ 'bar','line'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: [  'Doanh thu','Số lượng']
        },
        xAxis: [
          {
            type: 'category',
            data: this.revenue.map((data) => 'Tháng ' + data.month),
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Doanh thu',
            min: 0,
            max: Math.round(this.max * 1.5),
            interval: 2000000,
            axisLabel: {
              formatter: '{value} đ'
            }
          },
          {
            type: 'value',
            name: 'Số lượng',
            min: 0,
            max: this.maxSL * 2,
            interval: 10,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'Số lượng',
            type: 'bar',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value: number) {
                return value as number + ' sản phẩm';
              }
            },
            data:this.revenue.map((data) => Math.round(data.quantity))
          },
          {
            name: 'Doanh thu',
            type: 'line',
            tooltip: {
              valueFormatter: function (value: number) {
                return value as number + ' đ';
              }
            },
            data:this.revenue.map((data) => Math.round(data.total))
          }
          
        ]
      };
    })
  }
  loadChartLine2(year:number){
    const params = {
      year:year,
      isRepurchase:true
    }
    this.statisticalService.revenue(params).subscribe((res:any) =>{
      this.revenue2 = res.body.data;
      console.log(this.revenue2);
      this.revenue2.forEach((data)=>{
        if(data.total > this.max2){
          this.max2 = data.total;
        }
        if(data.quantity > this.maxSL2){
          this.maxSL2 = data.quantity;
        }
      });
      this.option0 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: [ 'bar','line'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: [  'Doanh thu','Số lượng']
        },
        xAxis: [
          {
            type: 'category',
            data: this.revenue2.map((data) => 'Tháng ' + data.month),
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Doanh thu',
            min: 0,
            max: Math.round(this.max2 * 1.1),
            interval: Math.round(this.max2/3),
            axisLabel: {
              formatter: '{value} đ'
            }
          },
          {
            type: 'value',
            name: 'Số lượng',
            min: 0,
            max: this.maxSL2 * 2,
            interval: 10,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'Số lượng',
            type: 'bar',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value: number) {
                return value as number + ' sản phẩm';
              }
            },
            data:this.revenue2.map((data) => Math.round(data.quantity))
          },
          {
            name: 'Doanh thu',
            type: 'line',
            tooltip: {
              valueFormatter: function (value: number) {
                return value as number + ' đ';
              }
            },
            data:this.revenue2.map((data) => Math.round(data.total))
          }
          
        ]
      };
    })
  }
  loadCategory(){
    this.statisticalService.category().subscribe((res:any)=>{
      this.category = res.body.data;
      console.log(this.category);
      const data:IcategoryStatistical[]= this.category.map((data=> new IcategoryStatistical(data.name,data.quantity)))
      console.log(data);
      
      this.option1 = {
        title: {
          text: 'Số lượng sản phẩm đã bán của thể loại',
          subtext: '(Thống kê thể loại)',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    })
  }
  loadMaterial(){
    this.statisticalService.material().subscribe((res:any)=>{
      this.category = res.body.data;
      console.log(this.category);
      const data:IcategoryStatistical[]= this.category.map((data=> new IcategoryStatistical(data.name,data.quantity)))
      console.log(data);
      
      this.option2 = {
        title: {
          text: 'Số lượng sản phẩm đã bán của chất liệu',
          subtext: '(Thống kê chất liệu)',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    })
  }
  loadYear(){
    for(var i = new Date().getFullYear() -5;i<=new Date().getFullYear();i++ ){
      this.curent.push(i);
    }
  }


  

}
