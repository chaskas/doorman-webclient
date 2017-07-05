import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { EventService } from '../../../services/event.service';

import { StatisticsService } from '../../../services/statistics.service';

import { Event } from '../../../model/event';

import { GuestAddComponent } from '../../guests/guest-add/guest-add.component';

import { ChartsModule } from 'ng2-charts';

import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

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
  public pieChart1Options:any = {
                                  legend: { position: 'right', labels: { usePointStyle: true } }
                                };

  //GRÁFICO 2
  public pieChart2Labels:string[] = ['Normal', 'Host', 'Residente', 'Embajador', 'Invitado +1', 'Invitado', '+4 Host', '+3 Residente', '+7 Embajador', '+1 Invitado +1', 'Staff'];
  public pieChart2Data:number[] = [0,0,0,0,0,0,0,0,0,0,0];
  public pieChart2Type:string = 'doughnut';
  public pieChart2Options:any = {
                                  legend: { position: 'right', labels: { usePointStyle: true } }
                                };

  //GRÁFICO 3
  public barChart3Labels:string[] = ['22', '23', '00', '01', '02', '03', '04'];
  public barChart3Type:string = 'bar';
  public barChart3Legend:boolean = true;
  public barChart3Data:any[] = [{data: [0, 0, 0, 0, 0, 0, 0], label: 'Cantidad', borderWidth: 0 }];
  public barChart3Options:any = {
                                  scaleShowVerticalLines: true,
                                  responsive: true,
                                  legend: { position: 'bottom', labels: { usePointStyle: true, fontSize: 11 } }
                                };

  //GRÁFICO 4
  public doughnutChart4Labels:string[] = new Array();
  public doughnutChart4Data:number[] = new Array();
  public doughnutChart4Type:string = 'doughnut';
  public doughnutChart4Options:any = {
                                  legend: { position: 'right', labels: { usePointStyle: true } }
                                };

  //GRÁFICO 5
  public barChart5Labels:string[] = ['Embajador', 'Host'];
  public barChart5Type:string = 'bar';
  public barChart5Legend:boolean = true;
  public barChart5Data:any[] = [{data: [0, 0], label: 'Cantidad', borderWidth: 0 }];
  public barChart5Options:any = {
                                  scaleShowVerticalLines: true,
                                  responsive: true,
                                  legend: { position: 'bottom', labels: { usePointStyle: true, fontSize: 11 } }
                                };

  event: Event;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private statisticsService: StatisticsService,
    public snackBar: MdSnackBar,
    public dialog: MdDialog,
    private _router: Router,
    private _tokenService: Angular2TokenService
  ) {

    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );

  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.eventService.getEvent(+params['id']))
      .subscribe(event => this._handleGetEventSuccess(event));

    this.route.params
      .switchMap((params: Params) => this.statisticsService.getChart1(+params['id']))
      .subscribe(data => this._handleChart1Success(data));

    this.route.params
      .switchMap((params: Params) => this.statisticsService.getChart2(+params['id']))
      .subscribe(data => this._handleChart2Success(data));

    this.route.params
      .switchMap((params: Params) => this.statisticsService.getChart3(+params['id']))
      .subscribe(data => this._handleChart3Success(data));

    this.route.params
        .switchMap((params: Params) => this.statisticsService.getChart4(+params['id']))
        .subscribe(data => this._handleChart4Success(data));


    this.route.params
        .switchMap((params: Params) => this.statisticsService.getChart5(+params['id']))
        .subscribe(data => this._handleChart5Success(data));

  }

  private _handleGetEventSuccess(event: Event)
  {
    this.event = event;
  }

  private _handleChart1Success(data: any)
  {
    this.pieChart1Data = [data['guests'],data['attendees']];

  }

  private _handleChart2Success(data: any)
  {
    this.pieChart2Data = [
                          data['normal'],
                          data['host'],
                          data['residente'],
                          data['embajador'],
                          data['invitado1'],
                          data['invitado'],
                          data['invHost'],
                          data['invResidente'],
                          data['invEmbajador'],
                          data['invInvitado1'],
                          data['invInvitado']
                        ];

  }

  private _handleChart3Success(data: any)
  {
    this.barChart3Data = [
        {data: [data['22'],
                data['23'],
                data['00'],
                data['01'],
                data['02'],
                data['03'],
                data['04']], label: 'Cantidad'}];
  }

  private _handleChart4Success(data: any)
  {
    this.doughnutChart4Labels = [];
    this.doughnutChart4Data = [];
    for (var i=0;i< data.length; i++)
    {
        this.doughnutChart4Labels.push(data[i]['name']);
        this.doughnutChart4Data.push(data[i]['guests']);
    }
  }

  private _handleChart5Success(data: any)
  {
    this.barChart5Data = [
        {data: [data['embajador'],
                data['host']], label: 'Cantidad'}];
  }

  addGuestsDialog() {
    var config = new MdDialogConfig();
    config.data = this.event;
    let dialogRef = this.dialog.open(GuestAddComponent, config);
    dialogRef.afterClosed().subscribe(result => { this.eventService.getEvent(this.event.id).then(event => this.ngOnInit()); });
  }

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
