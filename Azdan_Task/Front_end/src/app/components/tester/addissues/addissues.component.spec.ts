import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddissuesComponent } from './addissues.component';

describe('AddissuesComponent', () => {
  let component: AddissuesComponent;
  let fixture: ComponentFixture<AddissuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddissuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
