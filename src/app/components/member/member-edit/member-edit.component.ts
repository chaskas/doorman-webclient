import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { DialogsServiceService } from '../../../services/dialogs-service.service';
import { Member } from '../../../model/member';

import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { RutValidator } from '../../../utils/rut/ng2-rut.module'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: Member;
  members: Member[];
  memberForm: FormGroup;

  @Input() errors: string[];
  @Input() success: string;

  public result: any;
  constructor(
      private rv: RutValidator,
      private dialogsService: DialogsServiceService,
	    private memberService: MemberService,
	    private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      public snackBar: MdSnackBar,
      private _router: Router

  ) {

    this.createForm();

    this.route.params
      .switchMap((params: Params) => this.memberService.getMember(+params['id']))
      .subscribe(member => this._handleGetMemberSuccess(member));
  }

  ngOnInit() {

  }
  public openDialog() {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.deleteMember(res));
  }

  updateMember()
  {
  	this.memberService.updateMember(this.member.id, this.memberForm.value).then(
  		res => this._handleUpdateSuccess(res),
  		error => this._handleError(error)
  	);
  }

  deleteMember(res: boolean): void
  {
    if(res) {
      this.memberService.deleteMember(this.member.id).then((data) => {
        this._router.navigate(['members']);
      });
    }
  }

  private _handleGetMemberSuccess(member: Member)
  {
    this.member = member;

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
      email: [''],
      phone: [''],
      mtype: ['', [Validators.required]]

    });
	}

  private _handleUpdateSuccess(data: any) {
    this.errors = null;
    this.snackBar.open("Miembro actualizado correctamente", "OK", {
      duration: 2000,
    });

    this.success = "Miembro actualizado correctamente";
    //this.router.navigate(['dash/business/offers']);
  }

  private _handleError(error: any) {
      this.errors = error.json().errors.full_messages;
  }
}
