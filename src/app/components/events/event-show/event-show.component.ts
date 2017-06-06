import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { EventService } from '../../../services/event.service';

import { Event } from '../../../model/event';

import { GuestAddComponent } from '../../guests/guest-add/guest-add.component';

@Component({
  selector: 'app-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.css']
})
export class EventShowComponent implements OnInit {

  event: Event;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    public dialog: MdDialog,
  ) {
    
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.eventService.getEvent(+params['id']))
      .subscribe(event => this._handleGetEventSuccess(event));
  }

  private _handleGetEventSuccess(event: Event)
  {
    this.event = event;
  }

  addGuestsDialog() {
    var config = new MdDialogConfig();
    config.data = this.event;
    config.height = "400px";
    config.width = "600px";
    let dialogRef = this.dialog.open(GuestAddComponent, config);
    dialogRef.afterClosed().subscribe(result => { this.eventService.getEvent(this.event.id).then(event => this.ngOnInit()); });
  }

}
