import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListInvitadosComponent } from './member-list-invitados.component';

describe('MemberListInvitadosComponent', () => {
  let component: MemberListInvitadosComponent;
  let fixture: ComponentFixture<MemberListInvitadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberListInvitadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListInvitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
