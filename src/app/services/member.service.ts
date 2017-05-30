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

  getMembers(): Promise<Member[]> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json() as Member[])
               .catch(this.handleError);
  }

  getMember(id: number): Promise<Member> {
    return this.http.get(this.url + '/' + id)
               .toPromise()
               .then(response => response.json() as Member)
               .catch(this.handleError);
  }

  getHosts(): Promise<Member[]> {
    return this.http.get(this.url + '/m/host')
               .toPromise()
               .then(response => response.json() as Member[])
               .catch(this.handleError);
  }

  getResidentes(): Promise<Member[]> {
    return this.http.get(this.url + '/m/residente')
               .toPromise()
               .then(response => response.json() as Member[])
               .catch(this.handleError);
  }

  getInvitados(): Promise<Member[]> {
    return this.http.get(this.url + '/m/invitado')
               .toPromise()
               .then(response => response.json() as Member[])
               .catch(this.handleError);
  }

  createMember(member: Member) : Promise<Member>
	{
    let url = this.config.get('host') + '/people';
    let body = JSON.stringify({rut: member.rut, first_name: member.first_name, last_name: member.last_name,
                              gender: member.gender, email: member.email, phone: member.phone, mtype: member.mtype
                            });
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
              .toPromise()
              .then(response => response.json() as Member)
              .catch(this.handleError);
  }

  updateMember(id: number, member: Member): Promise<Member>
  {
    member.id = id;

    let body = JSON.stringify(member);

    const url = `${this.url}/${member.id}`;

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.put(url,body, options)
             .toPromise()
             .then(response => response.json() as Member)
             .catch(this.handleError);
  }

  deleteMember(id: number): Promise<any>
  {
    const url = `${this.url}/${id}`;
      return this.http.delete(url)
                  .toPromise()
                  .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>
  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
