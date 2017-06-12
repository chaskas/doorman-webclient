import { Component, OnInit } from '@angular/core';
import { Member } from '../../../../model/member';
import { MemberService } from '../../../../services/member.service';


@Component({
  selector: 'app-member-list-invitados',
  templateUrl: './member-list-invitados.component.html',
  styleUrls: ['./member-list-invitados.component.css']
})
export class MemberListInvitadosComponent implements OnInit {

  invitados: Member[] = [];

  constructor(
      private memberService: MemberService
  ) { }

  ngOnInit() {

    this.memberService.getNormales()
        .then(invitados => this.invitados = invitados);
  }

}
