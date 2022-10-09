/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailVendorComponent } from './detail-vendor.component';

describe('DetailVendorComponent', () => {
  let component: DetailVendorComponent;
  let fixture: ComponentFixture<DetailVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
