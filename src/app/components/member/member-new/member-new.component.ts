import { Component, OnInit,Input} from '@angular/core';

import { MemberService } from '../../../services/member.service';
import { Member } from '../../../model/member';
import { MdSnackBar } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { RutValidator } from '../../../utils/rut/ng2-rut.module'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-member-new',
  templateUrl: './member-new.component.html',
  styleUrls: ['./member-new.component.css']
})
export class MemberNewComponent implements OnInit {

  member: Member;
  memberForm: FormGroup;
  @Input() errors: string[];
	@Input() success: string;
  

  constructor(
    private rv: RutValidator,
    private memberService: MemberService,
    private formBuilder: FormBuilder,
    public snackBar: MdSnackBar

  ) {

    this.createForm();
   }

  ngOnInit() {

  }
  createMember()
  {
    this.memberService.createMember(this.memberForm.value).then(
      res =>      this._handleUpdateSuccess(res),
      error =>    this._handleError(error)
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
      rut: ['', [Validators.required, this.rv]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.email]],
      phone: ['', [Validators.required, CustomValidators.max(99999999999)]],
      mtype: ['', [Validators.required]]

    });
	}

  private _handleUpdateSuccess(data: any) {
    this.errors = null;
    this.snackBar.open("Miembro Registrado correctamente", "OK", {
      duration: 2000,
    });
  }


  private _handleError(error: any) {
      this.errors = error.json().errors.full_messages;
  }


}
