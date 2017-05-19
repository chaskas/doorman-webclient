import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { Member } from '../../../model/member';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: Member;

  constructor(
      private memberService: MemberService
  ) { }

  ngOnInit() {
  }



}
