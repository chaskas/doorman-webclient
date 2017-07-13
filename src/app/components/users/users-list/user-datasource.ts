import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { MdSort } from '@angular/material';
import { MdPaginator } from '@angular/material';

import { UsersDatabase } from './users-database';
import { User } from '../../../model/user';
import { Profile } from '../../../model/profile';

export class UserDataSource extends DataSource<any> {
  constructor(public _usersDatabase: UsersDatabase, private _sort: MdSort, private _paginator: MdPaginator) {
    super();
  }

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  connect(): Observable<User[]> {
    const displayDataChanges = [
      this._usersDatabase.dataChange,
      this._sort.mdSortChange,
      this._paginator.page,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      var data = this.getSortedData();

      data = data.slice().filter((item: User) => {
        let searchStr = (item.profile.first_name + " " + item.admin + " "+ item.email).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}

  getSortedData(): User[] {
    const data = this._usersDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string|boolean = '';
      let propertyB: number|string|boolean = '';

      switch (this._sort.active) {
        case 'admin': [propertyA, propertyB] = [a.admin, b.admin]; break;
        case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
        case 'rut': [propertyA, propertyB] = [a.profile.rut, b.profile.rut]; break;
        case 'full_name': [propertyA, propertyB] = [a.profile.first_name + " " + a.profile.last_name, b.profile.first_name + " " + b.profile.last_name]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
