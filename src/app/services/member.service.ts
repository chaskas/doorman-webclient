import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../config/app.config';
import { Member } from '../model/member';

@Injectable()
export class MemberService {
  constructor(
    private http: Http,
    private config: AppConfig

  ) { }


private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
return Promise.reject(error.message || error);
}

}
