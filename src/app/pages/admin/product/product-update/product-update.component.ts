import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductCategoryProperty } from '@shared/models/product-category-property.model copy';
import { IProduct, Product } from '@shared/models/productReal.model';
import { ProductService } from '@shared/services/product/product.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LENGTH_VALIDATOR } from '../../../../shared/constants/validators.constant';
import { Category } from '../../../../shared/models/category.model';
import { ProductPropertyValue } from '../../../../shared/models/product-property-value.model';
import { FileService } from '../../../../shared/services/file.service';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import { CategoryService } from '../../../../shared/services/product/category.service';
import CommonUtil from '../../../../shared/utils/common-utils';
import { MaterialService } from '../../../../shared/services/product/material.service';
import { AccessoryService } from '../../../../shared/services/product/accessory.service';
import { Material } from '../../../../shared/models/material.model';
import { Vendor } from '../../../../shared/models/vendor.model';
import { AccessorySearchRequest } from '../../../../shared/models/request/accessory-search-request.model';
import { Accessory } from '../../../../shared/models/accesory.model';
import { SizeService } from '../../../../shared/services/product/size.service';
import { Size } from '../../../../shared/models/size.model';
import {
  ROUTER_ACTIONS,
  ROUTER_UTILS,
} from '../../../../shared/utils/router.utils';
import { List } from 'echarts';
import { ProductStatus } from '../../../../shared/models/productReal.model';
import { PRODUCT_GENDER } from '../../../../shared/constants/product.constant copy';
import { VendorService } from '../../../../shared/services/product/vendorservice';
import { EventService } from '../../../../shared/services/product/event.service';
import { IEvent } from '../../../../shared/models/event.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  @Input() action = '';
  id = '';
  isUpdate = false;
  product: IProduct = new Product();
  updateProduct: Product = {};
  form: FormGroup = new FormGroup({});
  file?: File;
  categories: Category[] = [];
  materials: Material[] = [];
  vendors: Vendor[] = [];
  accessories: Accessory[] = [];
  fileOrigin: File[] = [];
  files: File[] | any = [];
  sizes: Size[] = [];
  dowloadUrl!: Observable<string>;
  imageUrls: string[] = [];
  events: IEvent[] = [];
  PRODUCT_GENDER = PRODUCT_GENDER;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  categoryProperties: ProductCategoryProperty[] = [];
  productPropertyValue: ProductPropertyValue[] = [];
  initalState: IProduct = new Product('', '', '');
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  isVisible = false;
  imageTam:string[] = [];
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private toast: ToastService,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NzModalService,
    private translateService: TranslateService,
    private materialService: MaterialService,
    private accessoryService: AccessoryService,
    private sizeService: SizeService,
    private vendorService: VendorService,
    private eventService: EventService,
    private storage: AngularFireStorage
  ) {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.id = res.get('id') || '';
    });

    this.activatedRoute.data.subscribe((res) => {
      this.action = res.action;
    });
  }
  ngOnInit() {
    this.initForm();
    this.loadData();
    this.loadVendor('');
    this.loadAccessory('');
    this.loadSize();
    this.loadCategory('');
    this.loadevent();
    this.loadMaterial('');
    if (this.action === ROUTER_ACTIONS.update && this.id !== '') {
      this.productService.detail(this.id).subscribe((res: any) => {
        this.product = res.body?.data;
        this.initForm();
        this.product.productProperties?.forEach((p) => {
          this.propertyProduct.push(this.fb.group({
            name:p.name,
            value:p.value
          }))
        });
        this.product.productSizes?.forEach((s) => {
          this.sizeProduct.push(this.fb.group({
            sizeId:s.sizeId,
            quantity:s.quantity,
            sizeName:s.size,
            purchasePrice:s.purchasePrice,
            salePrice:s.salePrice,
            weight:s.weight
          }))
        })
        this.imageTam = this.product.productImages?.map((image:any) => image.imageUrl) as string[];
      });
    }

  }
  initForm(): void {
    const dataObject =
      this.action === this.ROUTER_ACTIONS.create
        ? this.initalState
        : this.product;
    const sizeIds = dataObject.productSizes?.map((s) => s.sizeId);
    this.form = this.fb.group({
      nameProduct: [dataObject.nameProduct, [Validators.required]],
      salary: [dataObject?.salary, [Validators.required, Validators.min(0)]],
      categoryId: [dataObject?.categoryId, [Validators.required]],
      materialId: [dataObject?.materialId, [Validators.required]],
      vendorId: [dataObject?.vendorId, [Validators.required]],
      note: [dataObject?.note],
      sizeIds: [sizeIds, [Validators.required]],
      gender: [dataObject?.gender, [Validators.required]],
      eventId: [dataObject?.eventId],
      accessoryId: [dataObject?.accessoryId, [Validators.required]],
      productProperties: this.fb.array([]),
      sizeProducts: this.fb.array([]),
    });
  }
  get propertyProduct(): FormArray {
    return this.form.get('productProperties') as FormArray;
  }
  get sizeProduct(): FormArray {
    return this.form.get('sizeProducts') as FormArray;
  }
  get materialId(): string {
    return this.form.get('materialId')?.value as string;
  }
  get accessoryId(): string {
    return this.form.get('accessoryId')?.value as string;
  }
  loadPurchasePriceAndSalePrice(i:number,event:any) {
    this.sizeProduct.controls[i].get('weight')?.setValue(event.target.value);
    const material = this.materials
      .filter((material) => material.materialId === this.materialId)
      .map((material) => material.purchasePrice as number);
    const accessory = this.accessories
      .filter((accessory) => accessory.accessoryId === this.accessoryId)
      .map((accessory) => accessory.price as number);
    const materialSalePrice = this.materials
      .filter((material) => material.materialId === this.materialId)
      .map((material) => material.salePrice as number);
      const weight = this.sizeProduct.controls[i].get('weight')?.value;
    if (accessory.length === 0) {
      accessory[0] = 0;
    }
    if (material.length === 0) {
      material[0] = 0;
    }
    if (materialSalePrice.length === 0) {
      materialSalePrice[0] = 0;
    }
    this.sizeProduct.controls[i].get('purchasePrice')?.setValue((material[0]*weight) + accessory[0]);
    this.sizeProduct.controls[i].get('salePrice')?.setValue(materialSalePrice[0]*weight + accessory[0]);
  }

  loadVendor(event: any) {
    const vendorSearch = {
      keyword: event,
    };
    this.vendorService.autoComplete(vendorSearch).subscribe((res: any) => {
      this.vendors = res.body?.data?.data;
    });
  }
  loadMaterial(event: any) {
    const materialSearch = {
      keyword: event,
    };
    this.materialService.autoComplete(materialSearch).subscribe((res: any) => {
      this.materials = res.body?.data;
    });
  }
  loadCategory(event: any) {
    const categorySearch = {
      keyword: event,
    };
    this.categoryService
      .searchCategoriesAutoComplete(categorySearch)
      .subscribe((res: any) => {
        this.categories = res.body?.data;
      });
  }
  loadSize() {
    this.sizeService.autoComplete().subscribe((res: any) => {
      this.sizes = res.body?.data;
    });
  }
  loadAccessory(event: any) {
    const accessorySearch: AccessorySearchRequest = {
      keyword: event,
    };
    this.accessoryService
      .autoComplete(accessorySearch)
      .subscribe((res: any) => {
        this.accessories = res.body?.data?.data;
      });
  }
  loadevent() {
    this.eventService.getAll().subscribe((res: any) => {
      this.events = res.body?.data;
    });
  }
  getTitle() {
    return this.action === ROUTER_ACTIONS.create? 'model.product.create' : 'model.product.update';
  }
  getFilesOrigin(filesOrigin: any): void {
    this.fileOrigin = filesOrigin as File[];
  }
  loadData(): void {
    this.categoryService
      .searchCategoriesAutoComplete()
      .subscribe((response: any) => {
        this.categories = response?.body?.data;
      });
  }
  getMaterial(){
    this.sizeProduct.controls.forEach(control => {
      const material = this.materials
      .filter((material) => material.materialId === this.materialId)
      .map((material) => material.purchasePrice as number);
      const weight = control.get('weight')?.value as number;
      const accessory = this.accessories
      .filter((accessory) => accessory.accessoryId === this.accessoryId)
      .map((accessory) => accessory.price as number);
      if (accessory.length === 0) {
        accessory[0] = 0;
      }
      control.get('purchasePrice')?.setValue((material[0]* weight) + accessory[0]);
      control.get('salePrice')?.setValue((material[0]* weight) + accessory[0])
    })
  }

  loadSizeProduct() {
    this.sizeProduct.clear();
    const sizeIds: string[] = this.form.get('sizeIds')?.value;
    console.log(sizeIds);
    sizeIds.forEach((size) => {
      const sizeName = this.sizes
        .filter((s) => s.sizeId === size)
        .map((s) => s.size);
      this.sizeProduct.push(
        this.fb.group({
          sizeId: size,
          quantity: [0, Validators.required],
          sizeName: sizeName,
           weight: [0,Validators.required],
           purchasePrice: [0],
           salePrice: [0],
        })
      );
    });
  }
  onSubmit(): void {
    console.log(this.form);
    console.log(this.fileOrigin);
    console.log(this.files);
    const product: Product = {
      ...this.form.value,
      imageUrls: this.imageUrls,
    };
    console.log(product);
    if (this.action === this.ROUTER_ACTIONS.update) {
      this.update(product);
    } else {
      this.createProduct(product);
    }

    // if (this.file) {
    //   this.fileService.uploadFile(this.file).subscribe((response: any) => {
    //     const file = response.body?.data;
    //     const product: IProduct = {
    //       ...this.form.value,
    //       imageId: file.id,
    //       price:
    //         this.form.value.price &&
    //         CommonUtil.formatToNumber(this.form.value.price),
    //     };
    //     if (this.action === this.ROUTER_ACTIONS.update) {
    //       this.update(product);
    //     } else {
    //       this.createProduct(product);
    //     }
    //   });
    // } else {
    //   const product: IProduct = {
    //     ...this.form.value,
    //     price:
    //       this.form.value.price &&
    //       CommonUtil.formatToNumber(this.form.value.price),
    //   };
    //   if (this.action === this.ROUTER_ACTIONS.update) {
    //     this.update(product);
    //   } else {
    //     this.createProduct(product);
    //   }
    // }
  }
  setValue(i: number, name: string, event: any): void {
    const value = event.target.value;
    this.propertyProduct.controls[i].setValue({
      name: name,
      value: value,
    });
  }
  setValueSize(i: number, sizeId: string, sizeName: string, event: any): void {
    const value = event.target.value;
    this.sizeProduct.controls[i].get('sizeId')?.setValue(sizeId);
    this.sizeProduct.controls[i].get('quantity')?.setValue(value);
    this.sizeProduct.controls[i].get('sizeName')?.setValue(sizeName);
  }
  onCancel() {
    this.router.navigate([
      ROUTER_UTILS.product.root,
      ROUTER_UTILS.product.productList,
    ]);
  }
  loadPropertyByCategory(): void {
    const categoryIds: string = this.form.get('categoryId')?.value;
    this.propertyProduct.clear();
    this.categoryService
      .getPropertiesByCategoryIds(categoryIds)
      .subscribe((response: any) => {
        console.log(response);

        this.categoryProperties = response.body?.data;
        this.categoryProperties.forEach((data) => {
          this.propertyProduct.push(
            this.fb.group({
              name: [data.name],
              value: [''],
            })
          );
        });
      });
  }
  private createProduct(product: IProduct): void {
    const createForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.product.createProductTitle',
      'model.product.createProductContent',
      { name: product?.nameProduct }
    );

    const modal: NzModalRef = this.modalService.create(createForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.productService.create(product).subscribe((res: any) => {
          this.toast.success('model.product.success.create');
          this.onCancel();
        });
      }
    });
  }
  private update(product: IProduct): void {
    const createForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.product.updateProductTitle',
      'model.product.updateProductContent',
      { name: product?.nameProduct }
    );

    const modal: NzModalRef = this.modalService.create(createForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.productService
          .update(this.id, product)
          .subscribe((res: any) => {
            this.toast.success('model.product.success.update');
            this.onCancel();
          });
      }
    });
  }
  uploadFiles() {
    this.files.forEach((f:any) => {
      const n = Date.now();
      const filePath = `Image/${f.name}_${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, f);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.dowloadUrl = fileRef.getDownloadURL();
            this.dowloadUrl.subscribe((url) => {
              if (url) {
                this.imageUrls.push(url);
              }
              console.log(url);
            });
          })
        )
        .subscribe((url) => {
          if (url) {
            console.log(url);
          }
        });
    })
  }
  getFiles(files: any): void {
    this.files = files as File[];
    this.imageTam = [];
   this.files.forEach((file :any) => {
      const url = URL.createObjectURL(file);
      this.imageTam.push(url);
   });
   if (this.files) {
    this.uploadFiles();
  }
  }
  onLockAndUnLock(result: { success: boolean }): void {
    this.lockPopup.callBack = () => {};
    this.isVisible = false;
  }
}
