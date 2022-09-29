import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 isCollapsed = false;
 logo :string  = '../assets/image/logo.png';
  constructor() {}

  getWidthImage():number{
    if(this.isCollapsed){
      return 300;
    }else{
      return 100;
    }
  }

}
