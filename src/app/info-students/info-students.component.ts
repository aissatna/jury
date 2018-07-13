import { Component, OnInit, asNativeElements } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-info-students',
  templateUrl: './info-students.component.html',
  styleUrls: ['./info-students.component.css']
})


export class InfoStudentsComponent implements OnInit {

  chart: Chart;
  itemsData: AngularFireList<any[]>;
  itemsDataStudent: AngularFireList<any[]>;
  dataStudent = [];
  dataResultats = [];
  dataNotes = [];
  dataChart = [];
  UE: string;
  ImageURL: string;
  public show: boolean = false;


  constructor(public af: AngularFireDatabase) {
    this.itemsData = af.list('/jurys/jury/resultat');
    this.itemsDataStudent = af.list('etudiants');
  }

  ngOnInit() {
    this.dataResultats.splice(0, this.dataResultats.length)
    this.itemsData.snapshotChanges().subscribe(
      actions => {
        actions.forEach(action => {
          this.dataNotes.push(action.payload.toJSON())
        });
      });
    /////
    this.itemsDataStudent.snapshotChanges().subscribe(
      actions => {
        actions.forEach(action => {
          this.dataStudent.push(action.payload.toJSON())
        });
      });


  };
  getImageUrl(ID: number): string {
    this.dataStudent.forEach(e => {
      if (e.ID === ID) {
        this.ImageURL = e.ImageURL;
      };
    });
    return (this.ImageURL);

  };

  displayChart() {
    this.dataChart.splice(0, this.dataChart.length)
    this.dataNotes.forEach(e => {

      this.dataChart.push([e[this.UE.toUpperCase()].CC, e[this.UE.toUpperCase()].ET, this.getImageUrl(e.ID), e.ID]);
    });
    this.chartfunction(this.dataChart)

    /* Inversion de la valeur si c'est la première fois qu'on appuie sur le bouton Start*/
    if (!this.show) { this.show = !this.show; }


    /*********** Chart ******************************** */
  }
  chartfunction(dataChart) {
    let chart = new Chart({
      chart: {
        type: 'scatter',
      },

      title: {
        text: 'Les Notes ' + this.UE.toUpperCase()
      },
      yAxis: {
        title: {
          text: 'ET'
        },
        max: 20,
        min: 0,
        tickInterval: 2
      },
      xAxis: {
        title: {
          text: 'CC'
        },
        max: 20,
        min: 0,
        tickInterval: 2

      },
      tooltip: {

        useHTML: true,
        formatter: function () {
          for (var i = 0; i < dataChart.length; i++) {
            if (this.x == dataChart[i][0] && this.y == dataChart[i][1]) {
              var s = ' <img src="' + dataChart[i][2] + '" height="42" width="42">';
            }
          }
          s += '<br/>' + 'CC: ' +
            this.x + '<br/>' + 'ET: ' + this.y;
          return s;
        },

      },


      series: [

        {
          name: this.UE.toLocaleUpperCase(),
          data: dataChart,

        }],


    });

    this.chart = chart;

  }
  // Classer les étudiants par rapports aux notes de CC 
  ShowNoteCC() {
    this.chart.ref.update({
      plotOptions: {
        scatter: {
          zoneAxis: 'x',
          zones: [{
            value: 10,
            color: 'red'
          }, {
            color: 'green'
          }]
        }
      },
    })

  };

  // Classer les étudiants par rapports aux notes de ET
  ShowNoteET() {

    this.chart.ref.update({
      plotOptions: {
        scatter: {
          zoneAxis: 'y',
          zones: [{
            value: 10,
            color: 'red'
          }, {
            color: 'green'
          }]
        }
      },
    })

  };
  ShowNoteMOY(){


  
  }

}



