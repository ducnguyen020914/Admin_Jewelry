/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ApoimentComponent } from './apoiment.component';

describe('ApoimentComponent', () => {
  let component: ApoimentComponent;
  let fixture: ComponentFixture<ApoimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApoimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApoimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
