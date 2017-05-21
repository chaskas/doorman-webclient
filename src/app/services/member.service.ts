import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../config/app.config';
import { Member } from '../model/member';

@Injectable()
export class MemberService {

  private url = this.config.get('host') + '/people';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private config: AppConfig

  ) { }

  createMembers(member: Member)
	{
    let url = this.config.get('host') + '/member';
    let body = JSON.stringify({rut: member.rut, first_name: member.first_name, last_name: member.last_name,
                              gender: member.gender, email: member.email, phone: member.phone, mtype: member.mtype, last_seen: member.last_seen,
                            created_at: member.created_at, updated_at: member.updated_at});
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
            .toPromise()
            .then(response => response.json() as Member)
            .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
