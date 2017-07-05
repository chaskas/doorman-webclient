import { Component, OnInit, Input } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Angular2TokenService } from 'angular2-token';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAdmin: boolean = false;

  @Input() errors: string[];

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _tokenService: Angular2TokenService,
    private snackBar: MdSnackBar,
    private userService: UserService,
  ) {

    this._tokenService.validateToken().subscribe(
      res =>      this._handleTokenSuccess(res),
      error =>    this._handleTokenError(error)
    )

  }

  ngOnInit() {

  }

  private _handleGetActualUserSuccess(data: any) {
    this.isAdmin = data['admin'];
  }

  private _handleGetActualUserError(error: any) {
    this.errors = error.json().errors.full_messages;
  }

  private _handleTokenSuccess(error: any) {
    this.userService.getActualUser()
      .then(
        user => this._handleGetActualUserSuccess(user),
        error => this._handleGetActualUserError(error)
      );
  }

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
