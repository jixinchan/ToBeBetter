import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShouldsComponent } from './shoulds.component';

describe('ShouldsComponent', () => {
  let component: ShouldsComponent;
  let fixture: ComponentFixture<ShouldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShouldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShouldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
