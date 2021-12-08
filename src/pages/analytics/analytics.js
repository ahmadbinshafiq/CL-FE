import React from 'react';
import { Row, Col } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar, Line, Scatter } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Analytics = () => {

    //.......Bar Chart......//
    const optionsBar = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Conversation according to Branch',
          },
        },
      };

      const labelsBar = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

      const dataBar = {
        labels: labelsBar,
        datasets: [
          {
            label: 'Dataset 1',
            data: [12, 30, 40, 50, 25, 21, 52],
            backgroundColor: 'rgb(217, 41, 28)',
          },
        ],
      };
      //.......Bar Chart......//
      //.......Line Chart......//
      const optionsLine = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Conversation According to city',
          },
        },
      };

      const labelsLine = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

      const dataLine = {
        labels: labelsLine,
        datasets: [
          {
            label: 'Dataset 1',
            data: [12, 30, 40, 50, 25, 21, 52],
            borderColor: 'rgb(217, 41, 28)',
            backgroundColor: 'rgb(217, 41, 28)',
          }
        ],
      };

      //.......Line Chart......//

      //.......Scatter Chart......//

      const rand = () => Math.round(Math.random() * 20 - 10);
      let inc =1;

      const optionsScatter = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Number of Conversation According to Date in last month',
            },
          },
      };

      const dataScatter = {
        datasets: [
          {
            label: 'A dataset',
            data: [
                { x: inc, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
                { x: inc++, y: rand() },
              ],
            backgroundColor: 'rgb(217, 41, 28)',
          },
        ],
      };
      //.......Scatter Chart......//

      //.....Horizontal Bar Chart....//

      const optionsHorizontal = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Unique CNIC in a month',
          },
        },
      };

      const labelsHorizontal = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

     const dataHorizontal = {
        labels:labelsHorizontal,
        datasets: [
          {
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2, 3, 25],
            backgroundColor: 'rgb(217, 41, 28)',
          }
        ],
      };

    return (
        <div>
            <Row>
            <Col xs={6} lg={6}>
        <Widget style = {{backgroundColor: '#fff', boxShadow: '1px 1px 12px #55565c'}}>
        <Bar options={optionsBar} data={dataBar} />
            </Widget>
            </Col>
            <Col xs={6} lg={6}>
        <Widget style = {{backgroundColor: '#fff', boxShadow: '1px 1px 12px #55565c'}}>
        <Line options={optionsLine} data={dataLine} />;
            </Widget>
            </Col>
            </Row>


            <Row>
            <Col xs={6} lg={6}>
        <Widget style = {{backgroundColor: '#fff', boxShadow: '1px 1px 12px #55565c'}}>
        <Scatter options={optionsScatter} data={dataScatter} />
            </Widget>
            </Col>
            <Col xs={6} lg={6}>
        <Widget style = {{backgroundColor: '#fff', boxShadow: '1px 1px 12px #55565c'}}>
        <Bar options={optionsHorizontal} data={dataHorizontal} />;
            </Widget>
            </Col>
            </Row>
        </div>
    )
}

export default Analytics;
