import { Injectable } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserService } from '../../../services/user.service';

import { User } from '../../../model/user';


@Injectable()
export class UsersDatabase {

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  get data(): User[] { return this.dataChange.value; }

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.initialize();
  }

  setUsers(users: User[]){
    this.data.splice(0);
    for (let i = 0; i < users.length; i++) { this.addUser(users[i]); }
  }

  initialize(){
    this.route.params
    .switchMap((params: Params) => this.userService.getUsers())
    .subscribe(response => this.setUsers(response));
  }

  addUser(user: User) {
    const copiedData = this.data.slice();
    copiedData.push(user);
    this.dataChange.next(copiedData);
  }

}
