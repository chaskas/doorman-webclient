import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Member } from '../../../model/member';
import { MemberService } from '../../../services/member.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-show',
  templateUrl: './member-show.component.html',
  styleUrls: ['./member-show.component.css']
})
export class MemberShowComponent implements OnInit {

  member: Member;
  mtype_value: string;
  c_invite: number=0;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    public snackBar: MdSnackBar,
    private _router: Router,
    private _tokenService: Angular2TokenService
  ) {

    this._tokenService.validateToken().subscribe(
      res =>      console.log(res),
      error =>    this._handleTokenError(error)
    );

    this.route.params
    .switchMap((params: Params) => this.memberService.getMember(+params['id']))
    .subscribe(member => this._handleGetMemberSuccess(member));
  }

  ngOnInit() {

  }

  private _handleGetMemberSuccess(member: Member)
  {
    this.member = member;

    if(this.member.mtype == 0){
      this.mtype_value = "Normal";
      this.c_invite=0;
    }
    else if(this.member.mtype == 1){
      this.mtype_value = "Residente";
      this.c_invite=4;
    }
    else if(this.member.mtype == 2){
      this.mtype_value = "Host";
      this.c_invite=5;
    }
    else if(this.member.mtype == 3){
      this.mtype_value = "Invitado";
      this.c_invite=1;
    }
    else if(this.member.mtype == 5){
      this.mtype_value = "Invitado +1";
      this.c_invite=2;
    }
    else if(this.member.mtype == 4){
      this.mtype_value = "Embajador";
      this.c_invite=8;
    }

  }

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
