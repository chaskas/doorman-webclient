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

  getMembersByType(type: number): Promise<any> {
    return this.http.get(this.url + '/m/' + type)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  getNormales(): Promise<Member[]> {
    return this.http.get(this.url + '/m/normal')
               .toPromise()
               .then(response => response.json() as Member[])
               .catch(this.handleError);
  }

  createMember(member: Member) : Promise<Member>
	{
    let url = this.config.get('host') + '/people';

    var rut = "";

    if(member.rut.includes("-")){
      rut = member.rut.substring(0,member.rut.indexOf("-"))
    } else {
      rut = member.rut.substring(0,member.rut.length-1);
    }

    let body = JSON.stringify({
                          rut: rut,
                          first_name: member.first_name,
                          last_name: member.last_name,
                          gender: member.gender,
                          email: member.email,
                          phone: member.phone,
                          mtype: member.mtype
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
    const url = `${this.url}/${member.id}`;

    var rut = "";

    if(member.rut.includes("-")){
      rut = member.rut.substring(0,member.rut.indexOf("-"))
    } else {
      rut = member.rut.substring(0,member.rut.length-1);
    }

    let body = JSON.stringify({
                          id: member.id,
                          rut: rut,
                          first_name: member.first_name,
                          last_name: member.last_name,
                          gender: member.gender,
                          email: member.email,
                          phone: member.phone,
                          mtype: member.mtype
                        });

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
    return Promise.reject(error.message || error);
  }

}
