import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css'
// import { registerables } from 'chart.js';

const Chart = ( {data: { confirmed, deaths, recovered}, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchApi = async ()=> {
            setDailyData(await fetchDailyData())
        }

        fetchApi();
    },[]);

    const lineChart = (
        dailyData[0]
        ? (
        <Line
            data={{
                labels: dailyData.map(({ date}) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: 'blue',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    borderBackgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }],
            }}
        />) : null
    );

    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor:[
                                'rgba(0, 0, 225, 0.5)',
                                'rgba(0, 255, 225, 0.5)',
                                'rgba(255, 0, 225, 0.5)',
                            ],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend:{display: false },
                        title: { display: true, text: `Current state in ${country}`}
                    }}
                />
            ) : null
    );

    return (
        <div className={styles.container}>
        {country ? barChart: lineChart }

        </div>
    )
}

export default Chart;