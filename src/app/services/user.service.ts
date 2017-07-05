import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Angular2TokenService } from 'angular2-token';

import { User } from '../model/user';

import { AppConfig } from '../config/app.config';

@Injectable()
export class UserService {

  private url = 'users';

  constructor(
    private _tokenService: Angular2TokenService,
    private _router: Router,
    private _http: Http,
    private config: AppConfig
  ) { }

  getActualUser() : Promise<User>
  {

    const url = `${this.url}/${this._tokenService.currentUserData.id}`;

    return this._tokenService.get(url)
              .toPromise()
              .then(response => response.json() as User)
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>
  {
    return Promise.reject(error.message || error);
  }

}
