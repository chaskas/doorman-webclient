import { Component, Injectable, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/toPromise';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { MdSort } from '@angular/material';
import { MdPaginator } from '@angular/material';

import { Angular2TokenService } from 'angular2-token';
import { rutClean } from 'rut-helpers';

import { Member } from '../../../model/member';

import { MemberService } from '../../../services/member.service';
import { UserService } from '../../../services/user.service';

import { PeopleDatabase } from './people-database';
import { PersonDataSource } from './person-datasource';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {

  title: string = "Hosts";
  members: Member[];
  mtype: number = 0;

  displayedColumns = ['rut', 'full_name', 'last_seen', 'rank'];

  dataSource: PersonDataSource | null;

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(
      public snackBar: MdSnackBar,
      private _router: Router,
      private route: ActivatedRoute,
      private _tokenService: Angular2TokenService,
      private memberService: MemberService,
      public user: UserService,
      public _peopleDatabase: PeopleDatabase
  ) {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.mtype = parseInt(params['type']);
      if(this.mtype == 1) {
        this.title = "Residentes";
      } else if(this.mtype == 2) {
        this.title = "Hosts";
      } else if(this.mtype == 3) {
        this.title = "Invitados";
      } else if(this.mtype == 4) {
        this.title = "Embajadores";
      } else if(this.mtype == 5) {
        this.title = "Invitados+1";
      } else if(this.mtype == 0) {
        this.title = "Lista General";
      }
    });

    this._peopleDatabase = new PeopleDatabase(this.route, this.memberService);
    this.dataSource = new PersonDataSource(this._peopleDatabase, this.sort, this.paginator);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });

  }

  formatRut(rut: string) {
    rut = rutClean(rut);
    var rutDigits = parseInt(rut, 10);
    var m = 0;
    var s = 1;
    while (rutDigits > 0) {
        s = (s + rutDigits % 10 * (9 - m++ % 6)) % 11;
        rutDigits = Math.floor(rutDigits / 10);
    }
    var checkDigit = (s > 0) ? String((s - 1)) : 'K';

  return rut + "-" + checkDigit;
  }

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
