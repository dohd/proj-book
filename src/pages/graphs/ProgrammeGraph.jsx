import React from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';

import { GraphFilter } from 'components';

export default function ProgrammeGraph({ data, ...rest }) {
    return (
        <Card 
            className='programme-graph-card'
        >
            <GraphFilter {...rest} />
            <div className='bar-wrapper'>
                <Bar
                    data={data} 
                    options={{
                        responsive: true,
                        title: { 
                            text: 'Participants per Programme by Gender', 
                            display: true,
                            fontSize: 16,
                            fontColor: 'black'
                        },
                        legend: { position: 'right' },
                        scales: {
                            yAxes: [
                                {
                                    gridLines: {
                                        drawOnChartArea: false
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: { 
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        </Card>
    );
}