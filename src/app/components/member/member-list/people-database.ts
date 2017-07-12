import { Injectable } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MemberService } from '../../../services/member.service';

import { Member } from '../../../model/member';


@Injectable()
export class PeopleDatabase {

  dataChange: BehaviorSubject<Member[]> = new BehaviorSubject<Member[]>([]);
  get data(): Member[] { return this.dataChange.value; }

  constructor(private route: ActivatedRoute, private memberService: MemberService) {
    this.initialize();
  }

  setMembers(members: Member[]){
    this.data.splice(0);
    for (let i = 0; i < members.length; i++) { this.addMember(members[i]); }
  }

  initialize(){
    this.route.params
    .switchMap((params: Params) => this.memberService.getMembersByType(+params['type']))
    .subscribe(response => this.setMembers(response));
  }

  addMember(member: Member) {
    const copiedData = this.data.slice();
    copiedData.push(member);
    this.dataChange.next(copiedData);
  }

}
