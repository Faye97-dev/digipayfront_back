/*import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Badge, Button } from "reactstrap";

import { Line } from "react-chartjs-2";
import CountUp from "react-countup";*/

import React, { Component } from "react";

import Chart from "react-apexcharts";
import { Col, Row, Card } from "reactstrap";

export class Charts extends Component {
  render() {
    const data = [
      {
        name: this.props.labelPrimary || "Paiements reçus",
        data: [
          8000,
          9000,
          10000,
          15000,

          21000,
          20000,
          20010,
          24000,
          26000,
          30300,
          38000,
          53000,
        ],
      },
    ];
    const options = {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#3c44b1"],
      stroke: {
        width: [5],
        curve: "smooth",
        dashArray: [0],
      },
      title: {
        text: "Paiements reçus",
        align: "left",
        style: {
          fontSize: "18px",
        },
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
        offsetY: 5,
        fontSize: "15px",
        itemMargin: {
          horizontal: 15,
          vertical: 0,
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Fev",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juil",
          "Aout",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      yaxis: {
        min: 0,
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (MRU)";
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    };

    return (
      <>
        <Row className="py-5">
          <Col xs={12} lg={12}>
            <Card className="card-box mb-4">
              <div className="card-footer  text-center">
                <div className="pt-4 pr-4 pl-4">
                  <Chart
                    options={options}
                    series={data}
                    type="line"
                    height={500}
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Charts;
