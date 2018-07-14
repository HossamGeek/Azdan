import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditissuesComponent } from './editissues.component';

describe('EditissuesComponent', () => {
  let component: EditissuesComponent;
  let fixture: ComponentFixture<EditissuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditissuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
