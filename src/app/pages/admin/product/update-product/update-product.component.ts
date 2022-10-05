import { Component, OnInit,Input } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { finalize } from 'rxjs/operators';
import { ROUTER_ACTIONS } from '../../../../shared/utils/router.utils';
import {  Observable } from 'rxjs';
import { LENGTH_VALIDATOR } from '../../../../shared/constants/validators.constant';
import { Category } from '../../../../shared/models/category.model';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  @Input() action = '';
  imageSrc:string = "/src/assets/images/403.jpg"
  dowloadUrl!:Observable<string> ;
  files:any[] = [];  
  categories:Category[] = [];
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
 form:FormGroup = new FormGroup([]);
  constructor(private fb:FormBuilder,
    private storage:AngularFireStorage) { }

  ngOnInit() {
    this.form = this.fb.group({
      imageUrl : ['',Validators.required],
      properties:this.fb.array([]),
    }
      ) 
  }
  get properties():FormArray{
    return this.form.get('properties') as FormArray;
  }
  showImage(event:any){
    this.files = event.target.files;
  }
  submit(){
    this.uploadFiles();
  }
  uploadFiles(){
  for(var i = 0;i < this.files.length;i++){
      const n = Date.now();
      const filePath = `Image/${this.files[i].name}_${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath,this.files[i]);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.dowloadUrl = fileRef.getDownloadURL();
          this.dowloadUrl.subscribe(url => {
            if(url){
              this.imageSrc = url;
            }
            console.log(url);
            
          })
        })
      ).subscribe(url => {
        if(url){
          console.log(url);
          
        }
      })
    };
    
  }
  loadPropertyByCategory(){};
}
