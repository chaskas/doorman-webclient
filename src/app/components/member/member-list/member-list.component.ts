import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Angular2TokenService } from 'angular2-token';

import { Member } from '../../../model/member';

import { MemberService } from '../../../services/member.service';
import { UserService } from '../../../services/user.service';

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
      private memberService: MemberService,
      public snackBar: MdSnackBar,
      private _router: Router,
      private _tokenService: Angular2TokenService,
      private user: UserService
  ) {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );
  }

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

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
