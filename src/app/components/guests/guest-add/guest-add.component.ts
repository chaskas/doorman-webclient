import { Component, OnInit, Input } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import * as rutHelpers from 'rut-helpers';

import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

import { GuestService } from '../../../services/guest.service';

import { Event } from '../../../model/event';

@Component({
  selector: 'app-guest-add',
  templateUrl: './guest-add.component.html',
  styleUrls: ['./guest-add.component.css']
})
export class GuestAddComponent implements OnInit {

  event: Event;

  guests: string;

  valid_ruts: string[] = new Array();
  invalid_ruts: string[] = new Array();

  @Input() errors: string[];
	@Input() success: string;

  constructor(
    public dialogRef: MdDialogRef<GuestAddComponent>,
    public snackBar: MdSnackBar,
    private guestService: GuestService,
    private _router: Router,
    private _tokenService: Angular2TokenService
  ) {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );
  }

  addGuests() {

    for (var i = 0, len = this.valid_ruts.length; i < len; i++) {
      var clean = rutHelpers.rutClean(this.valid_ruts[i])
      this.valid_ruts[i] = clean.substring(0, clean.length - 1);
    }

    this.guestService.addGuests(this.event.id,this.sValue, this.valid_ruts).then(
      res =>      this._handleUpdateSuccess(res),
      error =>    this._handleError(error)
    );

    this.valid_ruts = [];

  }

  editInvalids(){
    for (var i = 0, len = this.invalid_ruts.length; i < len; i++) {
      this.guests += this.invalid_ruts[i] + "\n";
    }
    this.invalid_ruts = [];
  }

  removeValid(i: number){
    this.valid_ruts.splice(i,1);
  }

  removeInvalid(i: number){
    this.invalid_ruts.splice(i,1);
  }

  validate() {
    this.valid_ruts = new Array();
    this.invalid_ruts = new Array();

    var ruts = this.guests.split(/[\n,\s]+/);
    ruts = ruts.filter(entry => /\S/.test(entry));

    for (var i = 0, len = ruts.length; i < len; i++) {
      if(rutHelpers.rutValidate(ruts[i])){
        this.valid_ruts.push(rutHelpers.rutFormat(ruts[i]))
      } else {
        this.invalid_ruts.push(ruts[i]);
      }
    }

    this.guests = '';
  }

  private _handleUpdateSuccess(data: any) {
    this.snackBar.open("Invitados correctamente.", undefined, {
      duration: 2000,
    });
  }

  private _handleError(error: any) {
      this.errors = error.json();
      console.log(this.errors);
  }

  private _handleTokenError(error: any) {
    this.dialogRef.close();
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

  ngOnInit(){
    this.event = this.dialogRef._containerInstance.dialogConfig.data;
  }

  sValue: number = 60;

  get sDisplayValue(): string {
    if(this.sValue == 0)
      return "00:00";
    else if (this.sValue == 15)
      return "00:15";
    else if (this.sValue == 30)
      return "00:30";
    else if (this.sValue == 45)
      return "00:45";
    else if (this.sValue == 60)
      return "01:00";
    else if (this.sValue == 75)
      return "01:15";
    else if (this.sValue == 90)
      return "01:30";
    else if (this.sValue == 105)
      return "01:45";
    else if (this.sValue == 120)
      return "02:00";
    else if (this.sValue == 135)
      return "02:15";
    else if (this.sValue == 150)
      return "02:30";
    else if (this.sValue == 165)
      return "02:45";
    else if (this.sValue == 180)
      return "03:00";
    else if (this.sValue == 195)
      return "03:15";
    else if (this.sValue == 210)
      return "03:30";
    else if (this.sValue == 225)
      return "03:45";
    else if (this.sValue == 240)
      return "04:00";
    else if (this.sValue == 255)
      return "04:15";
    else if (this.sValue == 270)
      return "04:30";
    else if (this.sValue == 285)
      return "04:45";
    else if (this.sValue == 300)
      return "05:00";
  }


}
