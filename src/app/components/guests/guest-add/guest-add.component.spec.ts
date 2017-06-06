import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestAddComponent } from './guest-add.component';

describe('GuestAddComponent', () => {
  let component: GuestAddComponent;
  let fixture: ComponentFixture<GuestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
