import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';
import { UserService } from './services/user.service';

import { AppConfig } from './config/app.config';

import 'hammerjs';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
  private _tokenService: Angular2TokenService,
  private userService: UserService,
  private config: AppConfig
  ) {
    this._tokenService.init({
     apiBase: this.config.get('host')
    });
    this.userService.init();
  }
}
