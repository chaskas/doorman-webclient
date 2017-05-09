import { Component, OnInit } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';

import { Day } from '../../../model/day';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.css']
})
export class EventNewComponent implements OnInit {

  day: Day;

  constructor(
    public dialogRef: MdDialogRef<EventNewComponent>
  ) { }

  ngOnInit() {
    this.day = this.dialogRef._containerInstance.dialogConfig.data;
    console.log(this.day.date);
  }

}
