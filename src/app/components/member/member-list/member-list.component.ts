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

  hosts_pages: Array<number> = [];
  residentes_pages: Array<number> = [];
  embajadores_pages: Array<number> = [];
  invitados_pages: Array<number> = [];
  invitados1_pages: Array<number> = [];

  actual_tab: number = 0;
  actual_mtype: number = 0;

  actual_pages: Array<number> = [1,1,1,1,1];

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

  	this.memberService.getMembersByType(1,1).then(response => this.renderMembers(response));
    this.memberService.getMembersByType(2,1).then(response => this.renderMembers(response));
    this.memberService.getMembersByType(3,1).then(response => this.renderMembers(response));
    this.memberService.getMembersByType(4,1).then(response => this.renderMembers(response));
    this.memberService.getMembersByType(5,1).then(response => this.renderMembers(response));

  }

  changeTab(event: any){

    this.actual_tab = event['index'];

    if(event['index'] == 0)
      this.actual_mtype = 4;
    else if(event['index'] == 1)
      this.actual_mtype = 2;
    else if(event['index'] == 2)
      this.actual_mtype = 1;
    else if(event['index'] == 3)
      this.actual_mtype = 5;
    else if(event['index'] == 4)
      this.actual_mtype = 3;

    this.memberService.getMembersByType(this.actual_mtype,this.actual_pages[this.actual_tab]).then(response => this.renderMembers(response));

  }

  renderMembers(response: any)
  {
    if(response['mtype'] == 1) {
      this.residentes = response['people'];
      this.residentes_pages = Array.from(Array(parseInt(response['meta']['pages'])),(x,i)=>i);
    } else if(response['mtype'] == 2) {
      this.hosts = response['people'];
      this.hosts_pages = Array.from(Array(parseInt(response['meta']['pages'])),(x,i)=>i);
    } else if(response['mtype'] == 5) {
      this.invitados1 = response['people'];
      this.invitados1_pages = Array.from(Array(parseInt(response['meta']['pages'])),(x,i)=>i);
    } else if(response['mtype'] == 4) {
      this.embajadores = response['people'];
      this.embajadores_pages = Array.from(Array(parseInt(response['meta']['pages'])),(x,i)=>i);
    } else if(response['mtype'] == 3) {
      this.invitados = response['people'];
      this.invitados_pages = Array.from(Array(parseInt(response['meta']['pages'])),(x,i)=>i);
    }

  }

  changePage(page: number){
    this.actual_pages[this.actual_tab] = page;
    this.memberService.getMembersByType(this.actual_mtype,page).then(response => this.renderMembers(response));
  }

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
