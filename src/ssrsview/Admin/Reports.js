import React, { Component } from 'react';
import { Card, CardBody, CardHeader, FormGroup,Label,Col } from 'reactstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import axios from 'axios';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
export default class Reports extends Component {

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = [{
      "synopsisStatus": "AI",
      "count": 54
    },{
      "synopsisStatus": "Block Chain",
      "count": 13
    },{
      "synopsisStatus": "Networks",
      "count": 8
    },{
      "synopsisStatus": "Cloud Computing",
      "count": 4
    }
    ,{
      "synopsisStatus": "Distributed Databases",
      "count": 3
    }
    ,{
      "synopsisStatus": "NLP",
      "count": 1
    }];
    
    // Create axes
    
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "synopsisStatus";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    
    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      if (target.dataItem && target.dataItem.index & 2 == 2) {
        return dy + 25;
      }
      return dy;
    });
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = "synopsisStatus";
    series.name = "count";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;
    
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 0;
    columnTemplate.strokeOpacity = 1;

    columnTemplate.fill = am4core.color("#4591c3");
    columnTemplate.adapter.add("fill", function(fill, target) {
      if (target.dataItem && (target.dataItem.valueY < 5)) {
        return am4core.color("#B00100");
      }else if (target.dataItem && (target.dataItem.valueY < 10)) {
        return am4core.color("#008000");
      }
      else if (target.dataItem && (target.dataItem.valueY < 20)) {
        return am4core.color("#3c3cc7");
      }
      else if (target.dataItem && (target.dataItem.valueY < 30)) {
        return am4core.color("#9aa531");
      }
      else if (target.dataItem && (target.dataItem.valueY < 50)) {
        return am4core.color("#2196f3");
      }
      else if (target.dataItem && (target.dataItem.valueY < 100)) {
        return am4core.color("#c450d8");
      }
      else {
        return fill;
      }
    });

    this.chart = chart;
  }

    componentWillMount(){

      if (this.chart) {
        this.chart.dispose();
      }
    }

  render() {
    return (
        <div>
          <Card style={{width:'80%',marginLeft:"5%",marginTop:'2%',}}>
            <CardHeader style={{textAlign:'center',backgroundColor:'#647280'}}>
              <h2 style={{marginLeft:'2%'}}>Trends in Research</h2>
            </CardHeader>
            <CardBody>
            <div id="chartdiv" style={{ width: "80%", height: "500px" ,marginLeft:'10%'}}></div>
            </CardBody>
          </Card>
        </div>
    );
  }
}
