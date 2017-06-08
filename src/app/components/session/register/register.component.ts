import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';
import { CustomValidators } from 'ng2-validation';

import { SessionService } from '../../../services/session.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  first_name: FormControl = new FormControl("", Validators.required);
  last_name: FormControl = new FormControl("", Validators.required);
  email: FormControl = new FormControl("", Validators.compose([Validators.required, CustomValidators.email]));
  password: FormControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(8)]));
  password_confirmation: FormControl = new FormControl("", Validators.compose([Validators.required, CustomValidators.equalTo(this.password)]));

  @Input() errors: string[];

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private _tokenService: Angular2TokenService,
    private sessionService: SessionService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    });

  }

  doRegister()
  {
    let email = this.email.value;
    let password = this.password.value;
    let password_confirmation = this.password_confirmation.value;
    let first_name = this.first_name.value;
    let last_name = this.last_name.value;

    this.sessionService.doRegister(email, password, password_confirmation).subscribe(
      res =>      this._handleRegisterSuccess(res, first_name, last_name),
      error =>    this._handleRegisterError(error)
    );
  }

  private _handleRegisterSuccess(data: any, first_name: string, last_name: string) {
      this.errors = null;
      this.profileService.doCreate(data.json().data.id, first_name, last_name).subscribe(
        res =>      this._handleProfileSuccess(res),
        error =>    this._handleProfileError(error)
      );
  }

  private _handleRegisterError(error: any) {
      this.errors = error.json().errors.full_messages;
  }

  private _handleProfileSuccess(data: any) {
      this.errors = null;
      this._router.navigate(['/users/new']);
  }

  private _handleProfileError(error: any) {
      this.errors = error.json().errors.full_messages;
  }


}
