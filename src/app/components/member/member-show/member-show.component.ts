import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Member } from '../../../model/member';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-member-show',
  templateUrl: './member-show.component.html',
  styleUrls: ['./member-show.component.css']
})
export class MemberShowComponent implements OnInit {

member: Member;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.memberService.getMember(+params['id']))
    .subscribe(member => this.member = member);;
  }

}
