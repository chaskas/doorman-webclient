import { Component, OnInit, Input } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';
import { MdSnackBar } from '@angular/material';

import * as rutHelpers from 'rut-helpers';

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
    private guestService: GuestService
  ) { }

  addGuests() {

    for (var i = 0, len = this.valid_ruts.length; i < len; i++) {
      var clean = rutHelpers.rutClean(this.valid_ruts[i])
      this.valid_ruts[i] = clean.substring(0, clean.length - 1);
    }

    this.guestService.addGuests(this.event.id,this.valid_ruts).then(
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
    this.snackBar.open("Invitados correctamente.", "OK", {
      duration: 2000,
    });
  }

  private _handleError(error: any) {
      this.errors = error.json();
      console.log(this.errors);
  }

  ngOnInit(){
    this.event = this.dialogRef._containerInstance.dialogConfig.data;
  }

  // Slider
  s_autoTicks = true;
  s_disabled = false;
  s_invert = false;
  s_max = 5;
  s_min = 0;
  s_showTicks = true;
  s_step = 1;
  s_thumbLabel = true;
  s_value = 0;
  s_vertical = false;

  get s_displayValue(): string {
    if(this.s_value == 0)
      return "00";
  }

  get tickInterval(): number | 'auto' {
    return this.s_showTicks ? (this.s_autoTicks ? 'auto' : this._tickInterval) : null;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 1;

}
