import { Component, OnInit } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

import { Day } from '../../../model/day';
import { Event } from '../../../model/event';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.css']
})
export class EventNewComponent implements OnInit {

  day: Day;

  eventForm: FormGroup;

  event: Event;

  starts_str: string;
  ends_str: string;

  constructor(
    public dialogRef: MdDialogRef<EventNewComponent>,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    public snackBar: MdSnackBar,
    private _router: Router,
    private _tokenService: Angular2TokenService
  ) {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );
    this.createEventForm();
  }

  public submitEvent() {

    this.event = new Event();

    this.event.name = this.eventForm.value.name;
    this.event.starts = this.day.date.getFullYear() + "-" + (this.day.date.getMonth()+1) + "-" + this.day.date.getDate() + " " + this.eventForm.value.starts;

    var nextDay = new Date(this.day.date.getFullYear(),this.day.date.getMonth(),this.day.date.getDate());
    nextDay.setDate(this.day.date.getDate()+1);

    if (this.eventForm.value.starts > this.eventForm.value.ends) {
      this.event.ends = nextDay.getFullYear() + "-" + (nextDay.getMonth()+1) + "-" + nextDay.getDate() + " " + this.eventForm.value.ends;
    } else {
      this.event.ends = this.day.date.getFullYear() + "-" + (this.day.date.getMonth()+1) + "-" + this.day.date.getDate() + " " + this.eventForm.value.ends;
    }

    this.eventService.createEvent(this.event);
    this.dialogRef.close();

  }

  private createEventForm()
  {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      starts: ['20:00:00', [Validators.required]],
      ends: ['05:00:00', [Validators.required]]
    });
  }

  private _handleTokenError(error: any) {
    this.dialogRef.close();
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

  ngOnInit() {
    this.day = this.dialogRef._containerInstance.dialogConfig.data;
  }

}
