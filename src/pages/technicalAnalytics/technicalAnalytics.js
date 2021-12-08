import React from 'react';
import { Row, Col } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import { Chart as ChartJS,
        RadialLinearScale,  
        PointElement,
        LineElement,
        Filler,
        Tooltip, 
        ArcElement,  
        Legend } from 'chart.js';
import { Pie, Radar } from 'react-chartjs-2';

ChartJS.register(ArcElement,
                 RadialLinearScale, 
                 PointElement,
                 LineElement,
                 Filler,
                 Tooltip, 
                 Legend);

const TechnicalAnalytics = () => {

//.....Pie Chart....//
    const dataPie = {
        labels: ['Active','Offline', 'Down Time'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      //.....Pie Chart....//
      //.....Radar Chart....//

      const dataRadar = {
        labels: ['June', 'July', 'August', 'September', 'October', 'Novermber'],
        datasets: [
          {
            label: 'Storage usage in Month',
            data: [2, 9, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    return (
        <div>
             <Row>
                <Col xs={6} lg={6}>
                    <Widget style = {{backgroundColor: '#fff', boxShadow: '1px 1px 12px #55565c'}}>
                    <Pie data={dataPie} />
                    </Widget>
                </Col>
                <Col xs={6} lg={6}>
                    <Widget style = {{backgroundColor: '#fff', boxShadow: '1px 1px 12px #55565c'}}>
                        <Radar data={dataRadar} />
                    </Widget>
                </Col>
            </Row>
        </div>
    )
}

export default TechnicalAnalytics
