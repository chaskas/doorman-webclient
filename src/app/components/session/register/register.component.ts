import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';
import { CustomValidators } from 'ng2-validation';

import { SessionService} from '../../../services/session.service';

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
    private sessionService: SessionService
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


}
