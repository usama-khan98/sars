import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Progress } from 'reactstrap';
import { connect } from 'react-redux';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';

am4core.useTheme(am4themes_animated);

class Dashboard extends Component {


  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = [{
      "synopsisStatus": "Registered",
      "count": 54
    },{
      "synopsisStatus": "UnderReview",
      "count": 13
    },{
      "synopsisStatus": "Reviewed",
      "count": 8
    },{
      "synopsisStatus": "Presented",
      "count": 4
    }
    ,{
      "synopsisStatus": "Approved",
      "count": 3
    }
    ,{
      "synopsisStatus": "Rejected",
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




  render() {   
    return (
      <div className="animated fadeIn">
       <div className="row">
        <div className="col-md-3">
        <Card style={{width:'90%',marginLeft:"5%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'#4591c3'}}>
          <h3>54</h3>
          <h5>Assignment Registerd</h5>
          </CardHeader>
        </Card>
        </div>
        <div className="col-md-3">
        <Card style={{width:'90%',marginLeft:"5%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'#3c3cc7'}}>
          <h3>13</h3>
          <h5>Assignment UnderReview</h5>
          </CardHeader>
        </Card>
        </div>
        <div className="col-md-3">
        <Card style={{width:'90%',marginLeft:"5%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'green'}}>
          <h3>4</h3>
          <h5>Assignment Reviewed</h5>
          </CardHeader>
        </Card>
        </div>
        <div className="col-md-3">
        <Card style={{width:'90%',marginLeft:"5%",marginTop:'2%',}}>
          <CardHeader style={{textAlign:'center',backgroundColor:'#d03f3f'}}>
          <h3>0</h3>
          <h5>Assignment Presented</h5>
          </CardHeader>
        </Card>
        </div>
       </div>
       <div id="chartdiv" style={{ width: "80%", height: "500px" ,marginLeft:'10%'}}></div>
      </div>
    );
  }
}


export default Dashboard;
