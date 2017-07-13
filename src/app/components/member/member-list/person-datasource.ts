import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { MdSort } from '@angular/material';
import { MdPaginator } from '@angular/material';

import { PeopleDatabase } from './people-database';
import { Member } from '../../../model/member';

export class PersonDataSource extends DataSource<any> {
  constructor(public _peopleDatabase: PeopleDatabase, private _sort: MdSort, private _paginator: MdPaginator) {
    super();
  }

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  connect(): Observable<Member[]> {
    const displayDataChanges = [
      this._peopleDatabase.dataChange,
      this._sort.mdSortChange,
      this._paginator.page,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      var data = this.getSortedData();

      data = data.slice().filter((item: Member) => {
        let searchStr = (item.first_name + " " + item.last_name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}

  getSortedData(): Member[] {
    const data = this._peopleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
        case 'full_name': [propertyA, propertyB] = [a.first_name + " " + a.last_name, b.first_name + " " + b.last_name]; break;
        case 'last_seen': [propertyA, propertyB] = [a.last_seen, b.last_seen]; break;
        case 'rank': [propertyA, propertyB] = [a.rank, b.rank]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
