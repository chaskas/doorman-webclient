import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _router: Router,
    private _tokenService: Angular2TokenService
  ) {
    if(!this._tokenService.userSignedIn()){
      this._router.navigate(['/signin']);
    }
  }

  ngOnInit() {

  }

}
