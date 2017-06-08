import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../config/app.config';
@Injectable()
export class StatisticsService {

  private url = this.config.get('host') + '/statistics';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private config: AppConfig

  ) {
   }


  getChart1(id: number): Promise<any> {
    return this.http.get(this.url + '/1/' + id)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  getChart2(id: number): Promise<any> {
    return this.http.get(this.url + '/2/' + id)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }


  private handleError(error: any): Promise<any>
  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
