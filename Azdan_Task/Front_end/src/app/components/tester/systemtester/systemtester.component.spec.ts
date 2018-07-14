import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemtesterComponent } from './systemtester.component';

describe('SystemtesterComponent', () => {
  let component: SystemtesterComponent;
  let fixture: ComponentFixture<SystemtesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemtesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemtesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
