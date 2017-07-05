import { Component, OnInit } from '@angular/core';
import { Member } from '../../../../model/member';
import { MemberService } from '../../../../services/member.service';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-list-invitados',
  templateUrl: './member-list-invitados.component.html',
  styleUrls: ['./member-list-invitados.component.css']
})
export class MemberListInvitadosComponent implements OnInit {

  invitados: Member[] = [];

  constructor(
      private memberService: MemberService,
      public snackBar: MdSnackBar,
      private _router: Router,
      private _tokenService: Angular2TokenService
  ) {
    this._tokenService.validateToken().subscribe(
      res =>      console.log(res),
      error =>    this._handleTokenError(error)
    );
  }

  ngOnInit() {

    this.memberService.getNormales()
        .then(invitados => this.invitados = invitados);
  }

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
