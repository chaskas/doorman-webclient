import { Component, OnInit } from '@angular/core';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { EventService } from '../../services/event.service';

import { EventNewComponent } from '../events/event-new/event-new.component'

import { Event } from '../../model/event';
import { Day } from '../../model/day';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  today = new Date();

  day: number = this.today.getDate();
  year: number = this.today.getFullYear();
  month: number = this.today.getMonth();

  nDaysPM = 0;
  nDaysAM = 0;
  nDaysNM = 0;

  firstDay = new Date(this.year, this.month, 1).getDay();
  lastDay = new Date(this.year, this.month + 1, 0).getDay();

  daysList: Day[] = [];

  events: Event[] = [];

  constructor(
    private eventService: EventService,
    public dialog: MdDialog
  ) { }

  ngOnInit() {

    this.changeMonth(0);

  }

  createPreviousMonth(year: number, month: number) {
    var i = this.nDaysPM - this.firstDay + 1;
    for(i; i <= this.nDaysPM; i++){
      var day = new Day();
      day.date = new Date(year, month, i);
      this.daysList.push(day);
    }
  }

  createActualMonth(year: number, month: number) {
    for(var i = 1; i <= this.nDaysAM; i++){
      var day = new Day();
      day.date = new Date(year, month, i);
      this.daysList.push(day);
    }
  }

  createNextMonth(year: number, month: number) {
    for(var i = 1; i <= 6 - this.lastDay; i++){
      var day = new Day();
      day.date = new Date(year, month, i);
      this.daysList.push(day);
    }
  }

  changeMonth(m: number = 0) {

    this.month = this.month + m;

    this.today = new Date(this.year,this.month, this.day);

    this.day = this.today.getDate();
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();

    this.nDaysPM = 0;
    this.nDaysAM = 0;
    this.nDaysNM = 0;

    this.firstDay = new Date(this.year, this.month, 1).getDay();
    this.lastDay = new Date(this.year, this.month + 1, 0).getDay();

    this.daysList = [];
    this.events = [];

    this.eventService.getEventsByMonth(this.month + 1).then(events => this.fillMonth(events));

    let year: number = this.year;

    if(this.firstDay == 0) this.firstDay = 6;
    else this.firstDay--;

    if(this.lastDay == 0) this.lastDay = 6;
    else this.lastDay--;

    if(this.month == 0) year--;
    if(this.month == 11) year++;

    this.nDaysPM = new Date(year, this.month, 0).getDate();
    this.nDaysAM = new Date(this.year, this.month + 1, 0).getDate();
    this.nDaysNM = new Date(year, this.month + 2, 0).getDate();

    this.createPreviousMonth(this.year, this.month - 1);
    this.createActualMonth(this.year, this.month);
    this.createNextMonth(this.year, this.month + 1);

  }

  fillMonth(events: Event[]) {
    for(let day of this.daysList){
      for(let event of events){
        let eventDate = new Date(event['starts']);
        if(day.date.getTime() === new Date(eventDate.getFullYear(),eventDate.getMonth(),eventDate.getDate()).getTime()){
          day.event = event;
        }
      }
    }
  }

  getEvent(day: Day) {
    if(day.event) {
      // ver detalle evento
      console.log(day.event['name']);
    } else {
      // crear nuevo evento
      var config = new MdDialogConfig();
      config.data = day;
      let dialogRef = this.dialog.open(EventNewComponent, config);
      dialogRef.afterClosed().subscribe(result => { this.eventService.getEventsByMonth(this.month + 1).then(events => this.fillMonth(events)); });
    }
  }

}
