import { Component, OnInit } from '@angular/core';
import { StatisticalService } from '../../../../shared/services/statistical.service';
import { map } from 'rxjs/operators';
import { SatisticalCategory, IcategoryStatistical } from '../../../../shared/models/statistical.model';

@Component({
  selector: 'app-statistical-top',
  templateUrl: './statistical-top.component.html',
  styleUrls: ['./statistical-top.component.css']
})
export class StatisticalTopComponent implements OnInit {

  option:any;
  optionu:any;
  option1:any;
  option2:any;

  constructor(private statisticalService:StatisticalService) { }
  d = new Date().getFullYear();
  d2 = new Date().getFullYear();
  curent:Array<number> = [];
  category:SatisticalCategory[] = [];
  ngOnInit() {
    this.loadproductTop5(new Date().getFullYear());
    this.loadYear();
    this.loadCategory();
    this.loadMaterial();
    this.loadUserTop5(new Date().getFullYear())
  }

  loadYear(){
    for(var i = new Date().getFullYear() -5;i<=new Date().getFullYear();i++ ){
      this.curent.push(i);
    }
  }
  loadproductTop5(year:number){
    const params = {
      year:year
    }
    this.statisticalService.top5product(year).subscribe((res:any) =>{
      const data = res.body.data;
      console.log(data);
      
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Số lượng bán', 'Tỷ lệ so với tất cả sản phẩm bán ra']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value'
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: {
            show: false
          },
          data: data.map((data:any) => data.name)
        }
      ],
      series: [
        {
          name: 'Số lượng bán',
          type: 'bar',
          label: {
            show: true,
            position: 'inside'
          },
          emphasis: {
            focus: 'series'
          },
          data: data.map((data:any) => data.quantity)
        },
        {
          name: 'Tỷ lệ so với tất cả sản phẩm bán ra',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: data.map((data:any) => data.persent)
        }
      ]
    }});
    
    
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
  loadUserTop5(year:number){
    const params = {
      year:year
    }
    this.statisticalService.top5user(year).subscribe((res:any) =>{
      const data = res.body.data;
      console.log(data);
      
    this.optionu = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Số lượng mua']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value'
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: {
            show: false
          },
          data: data.map((data:any) => data.name)
        }
      ],
      series: [
        {
          name: 'Số lượng mua',
          type: 'bar',
          label: {
            show: true,
            position: 'inside'
          },
          emphasis: {
            focus: 'series'
          },
          data: data.map((data:any) => data.quantity)
        }
      ]
    }});
    
    
  }
}
