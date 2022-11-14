/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RepurchaseCreateBeforeComponent } from './repurchase-create-before.component';

describe('RepurchaseCreateBeforeComponent', () => {
  let component: RepurchaseCreateBeforeComponent;
  let fixture: ComponentFixture<RepurchaseCreateBeforeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepurchaseCreateBeforeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepurchaseCreateBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
