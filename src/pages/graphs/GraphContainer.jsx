import React, { useState, useEffect } from 'react';

import './graph.css';
import ProgrammeGraph from './ProgrammeGraph';
import RegionGraph from './RegionGraph';
import { useTracked } from 'context';
import barchartProp from './barchartProp';

export default function GraphContainer() {
    const [store, dispatch] = useTracked();
    const [dataset, setDataset] = useState({
        labels: { programme: [], region: [] }, 
        points: { programme: {}, region: {} }
    });

    const {programmeGraph} = store;
    useEffect(() => {
        if (programmeGraph.length) {
            const {label, male, female} = programmeGraph[0];
            const points = {male, female};
            setDataset(prev => ({
                labels: {...prev.labels, programme: label},
                points: {...prev.points, programme: points}
            }));
        }
    }, [programmeGraph]);

    const {regionGraph} = store;
    useEffect(() => {
        if (regionGraph.length) {
            const {label, male, female} = regionGraph[0];
            const points = {male, female};
            setDataset(prev => ({
                labels: {...prev.labels, region: label},
                points: {...prev.points, region: points}
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
