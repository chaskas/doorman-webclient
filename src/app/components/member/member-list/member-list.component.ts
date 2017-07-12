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
  members_mtype: number = 0;

  displayedColumns = ['rut', 'full_name', 'last_seen', 'total_visits'];

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
      let mtype = params['type'];
      if(parseInt(mtype) == 1) {
        this.title = "Residentes";
      } else if(parseInt(mtype) == 2) {
        this.title = "Hosts";
      } else if(parseInt(mtype) == 3) {
        this.title = "Invitados";
      } else if(parseInt(mtype) == 4) {
        this.title = "Embajadores";
      } else if(parseInt(mtype) == 5) {
        this.title = "Invitados+1";
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

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
