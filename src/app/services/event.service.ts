import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../config/app.config';

import { Event } from '../model/event';

@Injectable()
export class EventService {

  private url = this.config.get('host') + '/events';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private config: AppConfig
  ) { }

  getAllEvents(): Promise<Event[]> {
    return this.http.get(this.url, { headers: this.headers })
               .toPromise()
               .then(response => response.json() as Event[])
               .catch(this.handleError);
  }

  getEventsByMonth(month: number): Promise<Event[]> {
    const url = `${this.url}/month/${month}`;
    return this.http.get(url, { headers: this.headers })
               .toPromise()
               .then(response => response.json() as Event[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
