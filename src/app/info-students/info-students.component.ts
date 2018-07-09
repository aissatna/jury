import { Component, OnInit } from '@angular/core';
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
      console.log(e.ID)
      this.dataChart.push([e[this.UE].CC, e[this.UE].ET, this.getImageUrl(e.ID), e.ID]);
    });
    this.chartfunction(this.dataChart)



    /*********** Chart ******************************** */
  }
  chartfunction(data) {
    
    let chart = new Chart({
      chart: {
        type: 'scatter',

      },
      title: {
        text: 'Les Notes ' + this.UE
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
          for (var i = 0; i < data.length; i++) {
            if (this.x == data[i][0] && this.y == data[i][1]) {
              var s = ' <img src="' + data[i][2] + '" height="42" width="42">  ';
            }
          }
          s += '<br/>' + 'CC: ' +
            this.x + '<br/>' + 'ET: ' + this.y;
          return s;
        },
        shared: true
      },

      series: [
          { 

            type: 'line',
            data: [[0, 10], [10, 0]]
        },

        {
          name: this.UE,
          data: data
        }],
        
        
    });
    chart.addSerie;
    this.chart = chart;

  }

}


