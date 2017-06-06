import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../config/app.config';

@Injectable()
export class GuestService {

  constructor(
    private http: Http,
    private config: AppConfig
  ) { }

  addGuests(id: number, ruts: string[]) : Promise<string[]>
	{
    let url = this.config.get('host') + '/guest/add';

    let body = JSON.stringify ({
                                "id": id,
                                "ruts": ruts
                              });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
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
