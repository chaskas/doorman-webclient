import { Component, OnInit,Input} from '@angular/core';

import { MemberService } from '../../../services/member.service';
import { Member } from '../../../model/member';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: Member;
  memberForm: FormGroup;
  @Input() errors: string[];
  @Input() success: string;

  constructor(
	    private memberService: MemberService,
	    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    
  }

  updateMember()
  {
  	this.memberService.updateMember(this.memberForm.value).then(
  		res => this._handleUpdateSuccess(res),
  		error => this._handleError(error)
  	);
  }

  private _handleGetMemberSuccess(member: Member)
  {
    this.memberForm.setValue({
      rut: member.rut,
      first_name: member.first_name,
      last_name: member.last_name,
      gender: member.gender,
      email: member.email,
      phone: member.phone,
      mtype: member.mtype

    });
  }

	private createForm()
	{
    this.memberForm = this.formBuilder.group({
      rut: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      mtype: ['', [Validators.required]]

    });
	}

  private _handleUpdateSuccess(data: any) {
    this.errors = null;
    this.success = "Sucursal creada correctamente";
    //this.router.navigate(['dash/business/offers']);
  }

  private _handleError(error: any) {
      this.errors = error.json().errors.full_messages;
  }
}
