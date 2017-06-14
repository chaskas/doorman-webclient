import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Member } from '../../../model/member';
import { MemberService } from '../../../services/member.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-show',
  templateUrl: './member-show.component.html',
  styleUrls: ['./member-show.component.css']
})
export class MemberShowComponent implements OnInit {

  member: Member;
  mtype_value: string;
  c_invite: number=0;
// memberForm: FormGroup;

  constructor(
    private memberService: MemberService,
    // private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {

    this.route.params
    .switchMap((params: Params) => this.memberService.getMember(+params['id']))
    .subscribe(member => this._handleGetMemberSuccess(member));
  }

  ngOnInit() {

  }


  private _handleGetMemberSuccess(member: Member)
  {
    this.member = member;

    if(this.member.mtype == 0){
      this.mtype_value = "Normal";
      this.c_invite=0;
    }
    else if(this.member.mtype == 1){
      this.mtype_value = "Residente";
      this.c_invite=4;
    }
    else if(this.member.mtype == 2){
      this.mtype_value = "Host";
      this.c_invite=5;
    }
    else if(this.member.mtype == 3){
      this.mtype_value = "Invitado";
      this.c_invite=1;
    }
    else if(this.member.mtype == 5){
      this.mtype_value = "Invitado +1";
      this.c_invite=2;
    }
    else if(this.member.mtype == 4){
      this.mtype_value = "Embajador";
      this.c_invite=8;
    }



    // this.memberForm.setValue({
    //   rut: member.rut,
    //   first_name: member.first_name,
    //   last_name: member.last_name,
    //   gender: member.gender,
    //   email: member.email,
    //   phone: member.phone,
    //   mtype: member.mtype
    // });
  }


  	// private createForm()
  	// {
    //   this.memberForm = this.formBuilder.group({
    //     rut: ['', [Validators.required]],
    //     first_name: ['', [Validators.required]],
    //     last_name: ['', [Validators.required]],
    //     gender: ['', [Validators.required]],
    //     email: ['', [Validators.required]],
    //     phone: ['', [Validators.required]],
    //     mtype: ['', [Validators.required]]
    //
    //   });
  	// }

}
