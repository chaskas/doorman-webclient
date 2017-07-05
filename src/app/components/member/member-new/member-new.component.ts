import { Component, OnInit,Input} from '@angular/core';

import { MemberService } from '../../../services/member.service';
import { Member } from '../../../model/member';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { RutValidator } from '../../../utils/rut/ng2-rut.module'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

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
    public snackBar: MdSnackBar,
    private _router: Router,
    private _tokenService: Angular2TokenService

  ) {

    this._tokenService.validateToken().subscribe(
      res =>      console.log(res),
      error =>    this._handleTokenError(error)
    );

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
      phone: [''],
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

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }


}
