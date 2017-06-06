import { Component, OnInit, Input } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';
import { MdSnackBar } from '@angular/material';

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

  ruts: string[];

  badRuts: string[];

  @Input() errors: string[];
	@Input() success: string;

  constructor(
    public dialogRef: MdDialogRef<GuestAddComponent>,
    public snackBar: MdSnackBar,
    private guestService: GuestService
  ) { }

  addGuests() {
    this.split();
    this.guestService.addGuests(this.event.id,this.ruts).then(
      res =>      this._handleUpdateSuccess(res),
      error =>    this._handleError(error)
    );;
  }

  split() {
    this.ruts = this.guests.split(/[\n,\s]+/);
    this.ruts = this.ruts.filter(entry => /\S/.test(entry));

    for (var i = 0, len = this.ruts.length; i < len; i++) {
      this.ruts[i] = this.ruts[i].replace(/\./g,'');
      this.ruts[i] = this.ruts[i].replace(/\-/g,'');
    }
  }

  private _handleUpdateSuccess(data: any) {
    this.guests = "";
    this.badRuts = data;
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

}
