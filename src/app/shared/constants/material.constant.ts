import { MaterialStatus } from "@shared/models/request/material-search-request.model";

export const MATERIAL_TYPE  = [
  {value:'VANG_TAY',lable:'Vàng tây'},
  {value:'VANG',lable:'Vàng ta'},
  {value:'BAC',lable:'Bạc'},
  {value:'DONG',lable:'Đồng'},
  {value:'BACH_KIM',lable:'Bạch kim'},
  {value:'KIM_CUONG',lable:'Kim cương'},
];
export const MATERIAL_STATUS  = [
  {value:MaterialStatus.ACTIVE,lable:'Hoạt động'},
  {value:MaterialStatus.INACTIVE,lable:'Không hoạt động'},

];



