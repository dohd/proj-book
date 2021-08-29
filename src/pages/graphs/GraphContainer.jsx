import React, { useState, useEffect } from 'react';

import './graph.css';
import ProgrammeGraph from './ProgrammeGraph';
import RegionGraph from './RegionGraph';
import { useTracked } from 'context';
import barchartProp from './barchartProp';

const graphReducer = arr => arr.reduce((r,c,i,a) => {
    if (!r.labels) r.labels = a.map(v => v.programme || v.area);
    if (c.male) r.points.male.push(c.male);
    if (c.female) r.points.female.push(c.female);
    return  r;
}, { points: {male: [], female: []} });

export default function GraphContainer() {
    const [store, dispatch] = useTracked();
    const [dataset, setDataset] = useState({
        labels: { programme: [], region: [] }, 
        points: { programme: {}, region: {} }
    });

    const {programmeGraph} = store;
    useEffect(() => {
        if (programmeGraph.length) {
            const data = graphReducer(programmeGraph);
            setDataset(prev => ({
                labels: {...prev.labels, programme: data.labels},
                points: {...prev.points, programme: data.points}
            }));
        }
    }, [programmeGraph]);

    const {regionGraph} = store;
    useEffect(() => {
        if (regionGraph.length) {
            const data = graphReducer(regionGraph);
            setDataset(prev => ({
                labels: {...prev.labels, region: data.labels},
                points: {...prev.points, region: data.points}
            }));
        }
    }, [regionGraph]);

    const [chartData, setchartData] = useState({
        programme: {}, region: {}
    });
    useEffect(() => {
        const {labels, points} = dataset;
        const chart = barchartProp(labels, points);
        setchartData(chart);
    }, [dataset]);

    const progGraphProps = {
        dispatch,
        data: chartData.programme,
        apiKey: 'programmeGraph',
        actionType: 'addProgrammeGraph',
    };
    const regionGraphProps = {
        dispatch,
        data: chartData.region,
        apiKey: 'regionGraph',
        actionType: 'addRegionGraph',
    };

    return (
        <div className='graph-container'>
            <ProgrammeGraph {...progGraphProps} />
            <RegionGraph {...regionGraphProps} />
        </div>
    );
}
