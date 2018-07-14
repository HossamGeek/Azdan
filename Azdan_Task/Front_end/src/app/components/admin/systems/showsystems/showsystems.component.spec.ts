import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsystemsComponent } from './showsystems.component';

describe('ShowsystemsComponent', () => {
  let component: ShowsystemsComponent;
  let fixture: ComponentFixture<ShowsystemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsystemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
