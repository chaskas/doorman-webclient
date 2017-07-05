import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { DialogsServiceService } from '../../../services/dialogs-service.service';
import { Member } from '../../../model/member';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { RutValidator } from '../../../utils/rut/ng2-rut.module'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';

import { rutClean } from 'rut-helpers';

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

  public result: any;
  constructor(
      private rv: RutValidator,
      private dialogsService: DialogsServiceService,
	    private memberService: MemberService,
	    private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      public snackBar: MdSnackBar,
      private _router: Router,
      private _tokenService: Angular2TokenService

  ) {

    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );

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

    var rut = rutClean(member.rut);
    var rutDigits = parseInt(rut, 10);
    var m = 0;
    var s = 1;
    while (rutDigits > 0) {
        s = (s + rutDigits % 10 * (9 - m++ % 6)) % 11;
        rutDigits = Math.floor(rutDigits / 10);
    }
    var checkDigit = (s > 0) ? String((s - 1)) : 'K';

    member.rut = member.rut + "-" + checkDigit;

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
    this.snackBar.open("Miembro actualizado correctamente", undefined, {
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
