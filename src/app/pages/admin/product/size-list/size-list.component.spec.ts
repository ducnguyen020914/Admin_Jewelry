/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SizeListComponent } from './size-list.component';

describe('SizeListComponent', () => {
  let component: SizeListComponent;
  let fixture: ComponentFixture<SizeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
