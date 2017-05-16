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

  createMembers(member_id: number, rut: string, first_name: string, last_name: string, gender: string, email: string, phone: string, mtype: number, last_seen:string, created_at:string, updated_at: string)
	{
    let url = this.config.get('host') + '/member';
    let body = JSON.stringify({member_id: member_id, rut: rut, first_name: first_name, last_name: last_name,
                              gender: gender, email: email, phone: phone, mtype: mtype, last_seen: last_seen,
                            created_at: created_at, updated_at: updated_at});
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options);

}}
