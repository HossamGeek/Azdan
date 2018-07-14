import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsystemComponent } from './getsystem.component';

describe('GetsystemComponent', () => {
  let component: GetsystemComponent;
  let fixture: ComponentFixture<GetsystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetsystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
