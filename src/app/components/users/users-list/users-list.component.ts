import { Component, Injectable,Input, ViewChild, ElementRef } from '@angular/core';
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

import { User } from '../../../model/user';
import { Profile } from '../../../model/profile';

import { UserService } from '../../../services/user.service';

import { UsersDatabase } from './users-database';
import { UserDataSource } from './user-datasource';
@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent{
	users: User;
	@Input() errors: string[];

  dataSource: UserDataSource | null;
  displayedColumns = ['full_name','rut','email', 'admin'];

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;
  constructor(
      public snackBar: MdSnackBar,
      private _router: Router,
      private route: ActivatedRoute,
      private _tokenService: Angular2TokenService,
      public userService: UserService,
      public _usersDatabase: UsersDatabase
  	) {
  	this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );
  	 }

  ngOnInit() {
    this._usersDatabase = new UsersDatabase(this.route, this.userService);
    this.dataSource = new UserDataSource(this._usersDatabase, this.sort, this.paginator);

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
