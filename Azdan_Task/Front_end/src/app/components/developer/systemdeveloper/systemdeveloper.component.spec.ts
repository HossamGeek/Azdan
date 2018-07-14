import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemdeveloperComponent } from './systemdeveloper.component';

describe('SystemdeveloperComponent', () => {
  let component: SystemdeveloperComponent;
  let fixture: ComponentFixture<SystemdeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemdeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemdeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
