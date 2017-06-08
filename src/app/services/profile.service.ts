import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Angular2TokenService } from 'angular2-token';

import { AppConfig } from '../config/app.config';

@Injectable()
export class ProfileService {

  constructor(
    private _tokenService: Angular2TokenService,
    private _router: Router,
    private _http: Http,
    private config: AppConfig
  ) { }

  doCreate(user_id: string, first_name: string, last_name: string)
  {
    let url = this.config.get('host') + '/profile';

    let body = JSON.stringify({user_id: user_id, first_name: first_name, last_name: last_name});
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this._http.post(url, body, options);

  }

}
