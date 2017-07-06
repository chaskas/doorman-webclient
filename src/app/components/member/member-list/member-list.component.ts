import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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

  title: string = "Hosts";

  members: Member[] = [];
  members_mtype: number = 0;
  members_pages: Array<number> = [];

  current_page:   number = 1;
  first_page:     number = 1;
  last_page:      number = 1;
  prev_page:      number = 1;
  next_page:      number = 1;
  total_pages:    number = 1;

  constructor(
      private memberService: MemberService,
      public snackBar: MdSnackBar,
      private _router: Router,
      private route: ActivatedRoute,
      private _tokenService: Angular2TokenService,
      public user: UserService
  ) {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );
  }

  ngOnInit() {
    this.current_page = 1;
    this.route.params
    .switchMap((params: Params) => this.memberService.getMembersByType(+params['type'],1))
    .subscribe(response => this.renderMembers(response));

  }

  renderMembers(response: any)
  {
    window.scrollTo(0,0);

    this.current_page   = parseInt(response['meta']['current_page']);
    this.first_page     = response['meta']['first_page'];
    this.last_page      = response['meta']['last_page'];
    this.prev_page      = parseInt(response['meta']['prev_page']);
    this.next_page      = parseInt(response['meta']['next_page']);
    this.total_pages    = parseInt(response['meta']['total_pages']);

    this.members        = response['people'];
    this.members_mtype  = response['mtype'];

    if(this.members_mtype == 1) {
      this.title = "Residentes";
    } else if(this.members_mtype == 2) {
      this.title = "Hosts";
    } else if(this.members_mtype == 3) {
      this.title = "Invitados";
    } else if(this.members_mtype == 4) {
      this.title = "Embajadores";
    } else if(this.members_mtype == 5) {
      this.title = "Invitados+1";
    }

    var MIN: number = this.current_page - 2;
    var MAX: number = this.current_page + 2;

    if(MIN <= 0) {
      MAX = 5;
      MIN = 1;
    }

    if(MAX >= this.total_pages) {
      MAX = this.total_pages;
      MIN = this.total_pages - 4;
    }

    this.members_pages  = Array.from({length:MAX-MIN+1},(v,k)=>k+MIN);
  }

  changePage(page: number){
    this.current_page = page;
    this.memberService.getMembersByType(this.members_mtype,page).then(response => this.renderMembers(response));
  }

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
