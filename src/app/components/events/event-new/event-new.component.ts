import { Component, OnInit } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Day } from '../../../model/day';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.css']
})
export class EventNewComponent implements OnInit {

  day: Day;

  eventForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<EventNewComponent>,
    private formBuilder: FormBuilder
  ) {
    this.createEventForm();
  }

  private createEventForm()
  {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      starts: ['', [Validators.required]],
      ends: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.day = this.dialogRef._containerInstance.dialogConfig.data;
    console.log(this.day.date);
  }

}
