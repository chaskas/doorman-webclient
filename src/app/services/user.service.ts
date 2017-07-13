import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Angular2TokenService } from 'angular2-token';

import { User } from '../model/user';

import { AppConfig } from '../config/app.config';

@Injectable()
export class UserService {

  user: User;

  private url = 'users';

  constructor(
    private _tokenService: Angular2TokenService,
    private _router: Router,
    private _http: Http,
    private config: AppConfig
  ) { }

  init(){
    this._tokenService.validateToken().subscribe(
      res =>      this._handleTokenSuccess(res),
      error =>    this._handleTokenError(error)
    )
  }

  private _handleTokenSuccess(response: any) {
    this.getActualUser();
  }

  private _handleTokenError(error: any) {
    this._router.navigate(['/signin']);
  }

  isAdmin() : boolean {
    if(this.user != null && this.user['admin'])
      return true
    else return false;
  }

  private getActualUser() : Promise<User>
  {

    const url = `${this.url}/${this._tokenService.currentUserData.id}`;

    return this._tokenService.get(url)
              .toPromise()
              .then(response => this.handleSuccess(response.json() as User))
              .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return this._tokenService.get(this.url)
               .toPromise()
               .then(response => response.json() as User[])
               .catch(this.handleError);
  }

  private handleSuccess(response: User)
  {
    this.user = response;
  }

  private handleError(error: any): Promise<any>
  {
    return Promise.reject(error.message || error);
  }

  terminate(){
    this.user = null;
  }

}
