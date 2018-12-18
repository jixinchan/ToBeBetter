import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfodetailComponent } from './infodetail.component';

describe('InfodetailComponent', () => {
  let component: InfodetailComponent;
  let fixture: ComponentFixture<InfodetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfodetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
