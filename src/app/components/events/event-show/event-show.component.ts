import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { EventService } from '../../../services/event.service';

import { StatisticsService } from '../../../services/statistics.service';

import { Event } from '../../../model/event';

import { GuestAddComponent } from '../../guests/guest-add/guest-add.component';

import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.css']
})
export class EventShowComponent implements OnInit {


 //GRÁFICO 1
  public pieChart1Labels:string[] = ['Invitados', 'Asistentes'];
  public pieChart1Data:number[] = [0,0];
  public pieChart1Type:string = 'pie';

//GRÁFICO 2
  public pieChart2Labels:string[] = ['Invitados', 'Hosts', 'Residentes', 'Invitados Host', 'Invitados Residentes', 'Invitados Staff'];
  public pieChart2Data:number[] = [0,0,0,0,0,0];
  public pieChart2Type:string = 'pie';

//GRÁFICO 3
public barChart3Labels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
public barChart3Type:string = 'bar';
public barChart3Legend:boolean = true;

public barChart3Data:any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
];

public barChart3Options:any = {
  scaleShowVerticalLines: false,
  responsive: true
};


//GRÁFICO 4


  public chartPieClicked(e:any):void {
    console.log(e);
  }

  public chartPieHovered(e:any):void {
    console.log(e);
  }



  // events
  public chartBarClicked(e:any):void {
    console.log(e);
  }

  public chartBarHovered(e:any):void {
    console.log(e);
  }

  event: Event;

  chart1: any;



  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private statisticsService: StatisticsService,
    public dialog: MdDialog,
  ) {

  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.eventService.getEvent(+params['id']))
      .subscribe(event => this._handleGetEventSuccess(event));

    this.route.params
      .switchMap((params: Params) => this.statisticsService.getChart1(+params['id']))
      .subscribe(data => this._handleChart1Success(data));

  }

  private _handleGetEventSuccess(event: Event)
  {
    this.event = event;
  }

  private _handleChart1Success(data: any)
  {
    this.pieChart1Data = [data['guests'],data['attendees']];
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
