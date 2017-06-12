import { Component, OnInit } from '@angular/core';

import { Member } from '../../../model/member';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  hosts: Member[] = [];
  residentes: Member[] = [];
  embajadores: Member[] = [];
  invitados: Member[] = [];
  invitados1: Member[] = [];

  constructor(
      private memberService: MemberService
  ) { }

  ngOnInit() {

  	this.memberService.getHosts()
  	    .then(hosts => this.hosts = hosts);

    this.memberService.getResidentes()
  	    .then(residentes => this.residentes = residentes);

    this.memberService.getEmbajadores()
  	    .then(embajadores => this.embajadores = embajadores);

    this.memberService.getInvitados()
  	    .then(invitados => this.invitados = invitados);

    this.memberService.getInvitados1()
  	    .then(invitados1 => this.invitados1 = invitados1);

  }

}
