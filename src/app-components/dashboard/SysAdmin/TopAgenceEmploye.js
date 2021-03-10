import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  CardBody,
  Card,
  CardHeader,
  Badge,
  ListGroup,
  Button,
  Progress,
} from "reactstrap";

import Chart from "react-apexcharts";
import { Line } from "react-chartjs-2";
import CountUp from "react-countup";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import PerfectScrollbar from "react-perfect-scrollbar";
const chartDashboardCommerce4B = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
  ],
  datasets: [
    {
      backgroundColor: "rgba(248, 50, 69, 0.1)",
      borderCapStyle: "round",
      borderDash: [],
      borderWidth: 2,
      borderColor: "#f83245",
      borderDashOffset: 0.0,
      borderJoinStyle: "round",
      pointBorderColor: "#f83245",
      pointBackgroundColor: "#ffffff",
      pointBorderWidth: 0,
      pointHoverRadius: 0,
      pointHoverBackgroundColor: "#ffffff",
      pointHoverBorderColor: "#f83245",
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      data: [80, 81, 55, 65, 38, 53, 59, 77, 48],
      datalabels: {
        display: false,
      },
    },
  ],
};
const chartDashboardCommerce4BOptions = {
  layout: {
    padding: {
      left: -10,
      right: 0,
      top: 0,
      bottom: -10,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  responsive: true,
  maintainAspectRatio: false,
};

function ChartData() {
  const chartDashboardStatistics2AOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: "5",
      borderColor: "rgba(125, 138, 156, 0.3)",
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    fill: {
      color: "#3c44b1",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.2,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: ["#3c44b1"],
    legend: {
      show: false,
    },
    labels: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Juil"],
  };
  const chartDashboardStatistics2AData = [
    {
      name: "Net Profit",
      data: [3.3, 3.1, 4.0, 5.8, 2.1, 3.6, 3.2],
    },
    {
      name: "Net Loss",
      data: [2.1, 2.1, 2.8, 2.8, 4.3, 2.7, 1.4],
    },
  ];

  const chartDashboardStatistics2BOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#3c44b1", "rgba(60, 68, 177, 0.27)"],
    fill: {
      opacity: 0.85,
      colors: ["#3c44b1", "rgba(60, 68, 177, 0.27)"],
    },
    grid: {
      strokeDashArray: "5",
      borderColor: "rgba(125, 138, 156, 0.3)",
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    legend: {
      show: false,
    },
    labels: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Juil"],
  };
  const chartDashboardStatistics2BData = [
    {
      name: "Net Profit",
      data: [3.3, 3.1, 4.0, 5.8, 2.1, 3.6, 3.2],
    },
    {
      name: "Net Loss",
      data: [2.1, 2.1, 2.8, 2.8, 4.3, 2.7, 1.4],
    },
  ];

  return (
    <>
      <Row>
        <Col xl="6">
          <Card className="card-box mb-5">
            <span className="ribbon-angle ribbon-angle--top-right ribbon-warning">
              <small>Demo</small>
            </span>
            <CardHeader>
              <div className="card-header--title">
                <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
                  Rapports de revenus
                </h4>
              </div>
              <div className="card-header--actions">
                <Button size="sm" color="neutral-primary">
                  <span className="btn-wrapper--label">Exporter</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon
                      icon={["fas", "chevron-down"]}
                      className="opacity-8 font-size-xs"
                    />
                  </span>
                </Button>
              </div>
            </CardHeader>
            <div className="card-body pb-1 font-weight-bold">
              <Row className="pt-3">
                <Col sm="6" md="5">
                  <div className="pb-4 px-3">
                    <span className="text-dark pb-4"> Revenu annuel</span>
                    <span className="font-size-lg d-block">
                      12.236.010<small> MRU</small>
                    </span>
                  </div>
                </Col>
                <Col sm="6" md="7">
                  <div className="pb-4 px-3">
                    <span className="text-dark pb-4">Revenu cible</span>
                    <span className="d-flex align-items-center font-size-lg d-block">
                      <Progress
                        value="65"
                        striped
                        animated
                        color="warning"
                        className="progress-sm flex-grow-1 progress-bar-rounded"
                      />
                      <span className="pl-3">65%</span>
                    </span>
                  </div>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col xl="12">
                  <div className="pb-4 px-3">
                    <span className="text-dark pb-4">
                      Nombre de transactions
                    </span>
                    <span className="font-size-lg d-block">27569</span>
                  </div>
                </Col>
              </Row>
              <Chart
                options={chartDashboardStatistics2AOptions}
                series={chartDashboardStatistics2AData}
                type="area"
                height={317}
              />
            </div>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="card-box mb-5">
            <span className="ribbon-angle ribbon-angle--top-right ribbon-warning">
              <small>Demo</small>
            </span>
            <CardHeader>
              <div className="card-header--title">
                <h4 className="font-size-lg mb-0 py-2 font-weight-bold"></h4>
              </div>
              <div className="card-header--actions">
                <Button size="sm" color="neutral-first">
                  <span className="btn-wrapper--label">Actions</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon
                      icon={["fas", "chevron-down"]}
                      className="opacity-8 font-size-xs"
                    />
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Chart
                options={chartDashboardStatistics2BOptions}
                series={chartDashboardStatistics2BData}
                type="bar"
                height={280}
              />
              <Row>
                <Col md="6">
                  <div className="p-3">
                    <div className="mb-1 font-weight-bold">Transferts</div>
                    <Progress
                      animated
                      className="progress-xs progress-animated-alt"
                      color="primary"
                      value="34"
                    />
                    <div className="align-box-row progress-bar--label mt-1 text-muted">
                      <small className="text-dark">0</small>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="p-3">
                    <div className="mb-1 font-weight-bold">Paiements</div>
                    <Progress
                      animated
                      className="progress-xs progress-animated-alt"
                      color="success"
                      value="51"
                    />
                    <div className="align-box-row progress-bar--label mt-1 text-muted">
                      <small className="text-dark">0</small>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="p-3">
                    <div className="mb-1 font-weight-bold">Retraits</div>
                    <Progress
                      animated
                      className="progress-xs progress-animated-alt"
                      color="warning"
                      value="29"
                    />
                    <div className="align-box-row progress-bar--label mt-1 text-muted">
                      <small className="text-dark">0</small>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="p-3">
                    <div className="mb-1 font-weight-bold">Clients</div>
                    <Progress
                      animated
                      className="progress-xs progress-animated-alt"
                      color="danger"
                      value="76"
                    />
                    <div className="align-box-row progress-bar--label mt-1 text-muted">
                      <small className="text-dark">0</small>
                      <div className="ml-auto">100%</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default function TopAgenceEmploye() {
  const chartDashboardCommerce4AOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "60%",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: ["#3c44b1", "rgba(122, 123, 151, 0.4)"],
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
    },
    labels: [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
      "Semaine précédente",
      "Mois précédent",
      "Trimestre précédent",
      "Année précédente",
    ],
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      min: 0,
    },
  };
  const chartDashboardCommerce4AData = [
    {
      name: "Net Profit",
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 3.8, 5.1, 3.6, 3.2],
    },
    {
      name: "Net Loss",
      data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1, 2.6, 1.2],
    },
  ];

  return (
    <>
      <Row className="pt-5">
        <Col xl="6">
          <Card className="card-box mb-md-5">
            <span className="ribbon-angle ribbon-angle--top-right ribbon-warning">
              <small>Demo</small>
            </span>
            <CardHeader className="pr-2">
              <div className="card-header--title py-2 font-size-lg font-weight-bold">
                Top Paiements
              </div>
              <div className="card-header--actions">
                <Button size="sm" color="neutral-primary" className="mr-3">
                  Voir tout
                </Button>
              </div>
            </CardHeader>
            <div className="px-4 pt-4 bg-secondary">
              <div className="align-box-row">
                <div className="font-weight-bold">
                  <small className="text-black-50 d-block mt-2 mb-2 text-uppercase font-weight-bold">
                    Nouveaux comptes
                  </small>
                  <span className="font-size-xxl ">772</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-primary font-size-xl d-50 rounded-circle">
                    <FontAwesomeIcon icon={["far", "lightbulb"]} />
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <FontAwesomeIcon
                  icon={["fas", "arrow-up"]}
                  className="text-danger"
                />
                <span className="text-success px-1">7.4%</span>
                <span className="text-black-50">hausse de ce mois</span>
              </div>
              <div>
                <Chart
                  options={chartDashboardCommerce4AOptions}
                  series={chartDashboardCommerce4AData}
                  type="bar"
                  height={130}
                />
              </div>
            </div>
            <div className="divider bg-dark opacity-3" />
            <div className="text-uppercase px-3 pt-3 pb-1 text-black-50">
              Top Vendeurs
            </div>
            <div className="scroll-area-sm shadow-overflow">
              <PerfectScrollbar>
                <ListGroup flush>
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-danger justify-content-center d-flex"
                      >
                        <div className="bg-danger text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={["fas", "chevron-down"]}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Bana Blanc
                        </a>
                        <div>
                          <Badge
                            className="font-size-sm mt-1"
                            color="neutral-dark"
                          >
                            6789
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <CountUp
                        start={0}
                        end={587000}
                        duration={4}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                      <span className="opacity-6 pl-1">MRU</span>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-warning justify-content-center d-flex"
                      >
                        <div className="bg-success text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={["fas", "chevron-up"]}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Gallery Tata
                        </a>
                        <div>
                          <Badge
                            className="font-size-sm mt-1"
                            color="neutral-dark"
                          >
                            5670
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <CountUp
                        start={0}
                        end={346300}
                        duration={4}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                    </div>
                    <span className="opacity-6 pl-1">MRU</span>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-success justify-content-center d-flex"
                      >
                        <div className="bg-success text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={["fas", "arrow-up"]}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Station Total BMD
                        </a>
                        <div>
                          <Badge
                            className="font-size-sm mt-1"
                            color="neutral-dark"
                          >
                            4502
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <CountUp
                        start={0}
                        end={352000}
                        duration={4}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                    </div>
                    <span className="opacity-6 pl-1">MRU</span>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-success justify-content-center d-flex"
                      >
                        <div className="bg-warning text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={["far", "dot-circle"]}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Patisserie Prince
                        </a>
                        <div>
                          <Badge
                            className="font-size-sm mt-1"
                            color="neutral-dark"
                          >
                            3670
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <CountUp
                        start={0}
                        end={257430}
                        duration={4}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                      <span className="opacity-6 pl-1">MRU</span>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 pl-3 pr-4">
                    <div className="d-flex align-items-center flex-grow-1">
                      <CircularProgressbarWithChildren
                        value={32}
                        styles={buildStyles({ rotation: 1 / 2 + 1 / 4 })}
                        strokeWidth={6}
                        className="circular-progress-xs circular-progress-warning justify-content-center d-flex"
                      >
                        <div className="bg-success text-white mr-3 rounded-circle d-30 btn-icon mx-auto">
                          <FontAwesomeIcon
                            icon={["fas", "chevron-up"]}
                            className="font-size-xs"
                          />
                        </div>
                      </CircularProgressbarWithChildren>
                      <div className="pb-1 pl-3">
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          Boutique Nivea TVZ
                        </a>
                        <div>
                          <Badge
                            className="font-size-sm mt-1"
                            color="neutral-dark"
                          >
                            2830
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-black font-size-lg d-flex align-items-center">
                      <CountUp
                        start={0}
                        end={234630}
                        duration={4}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        suffix=""
                      />
                      <span className="opacity-6 pl-1">MRU</span>
                    </div>
                  </li>
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </Card>
        </Col>
        <Col xl="6">
          <Card className="card-box mb-xl-0 mb-5 ">
            <span className="ribbon-angle ribbon-angle--top-right ribbon-warning">
              <small>Demo</small>
            </span>
            <CardHeader>
              <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
                Revenue{" "}
              </h4>
            </CardHeader>
            <CardBody className="pb-0">
              <Row className="no-gutters">
                <Col md="12">
                  <div className="divider-v divider-v-md" />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Revenue</b>
                      <div className="text-black-50">Transferts du mois</div>
                    </div>
                    <div className="font-weight-bold text-danger font-size-xl">
                      <CountUp
                        start={0}
                        end={1836300}
                        duration={6}
                        delay={2}
                        separator=""
                      />
                      <small> MRU</small>
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Utilisateurs</b>
                      <div className="text-black-50">
                        Clients de cette semaine
                      </div>
                    </div>
                    <div className="font-weight-bold text-success font-size-xl">
                      <CountUp
                        start={0}
                        end={208400}
                        duration={6}
                        delay={2}
                        separator=""
                        decimals={0}
                        decimal=","
                      />
                      <small> MRU</small>
                    </div>
                  </div>
                  <div className="divider" />
                  {/*<div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Paiements</b>
                      <div className="text-black-50">
                        Revue de cette semaine
                      </div>
                    </div>
                    <div className="font-weight-bold text-warning font-size-xl">
                      <CountUp
                        start={0}
                        end={9896}
                        duration={6}
                        delay={2}
                        separator=""
                        decimals={0}
                        decimal=","
                      />
                    </div>
                </div>*/}
                </Col>
                <Col md="12">
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Statistiques</b>
                      <div className="text-black-50">Revenu annuel cible</div>
                    </div>
                    <div className="font-weight-bold text-warning font-size-xl">
                      65M MRU
                    </div>
                  </div>
                  <div className="divider" />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Dettes</b>
                    </div>
                    <div className="font-weight-bold text-danger font-size-xl">
                      - 3.2M MRU
                    </div>
                  </div>
                  <div className="divider" />
                  {/*<div className="d-flex align-items-center justify-content-between p-3">
                    <div>
                      <b>Orders</b>
                      <div className="text-black-50">Products ordered</div>
                    </div>
                    <div className="font-weight-bold text-warning font-size-xl">
                      65
                    </div>
                  </div>*/}
                </Col>
              </Row>
              <div className="card-footer rounded bg-secondary border-0 my-3 p-4 text-center">
                <Button size="sm" className="hover-scale-lg" color="second">
                  <span className="btn-wrapper--label">Voir plus</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={["fas", "arrow-right"]} />
                  </span>
                </Button>
              </div>
            </CardBody>
            {/*<div className="sparkline-full-wrapper">
              <Line
                data={chartDashboardCommerce4B}
                options={chartDashboardCommerce4BOptions}
              />
                </div>*/}
          </Card>
        </Col>
      </Row>
      <ChartData />
    </>
  );
}
