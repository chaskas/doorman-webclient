import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Angular2TokenService } from 'angular2-token';

import { AppConfig } from '../config/app.config';

@Injectable()
export class GuestService {

  constructor(
    private http: Http,
    private tokenService: Angular2TokenService,
    private config: AppConfig
  ) { }

  addGuests(id: number, ends: number, ruts: string[]) : Promise<string[]>
	{
    let url = '/guest/add';

    let body = JSON.stringify ({
                                "id": id,
                                "ends": ends,
                                "ruts": ruts
                              });

    return this.tokenService.post(url, body)
              .toPromise()
              .then(response => response.json() as string[])
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>
  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
