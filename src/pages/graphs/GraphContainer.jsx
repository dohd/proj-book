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
            const labels = programmeGraph.map(v => v.programme);
            const points = {male: [], female: []};
            programmeGraph.forEach(obj => {
                if (obj.male) points.male.push(obj.male)
                if (obj.female) points.female.push(obj.female)
            });
            setDataset(prev => ({
                labels: {...prev.labels, programme: labels},
                points: {...prev.points, programme: points}
            }));
        }
    }, [programmeGraph]);

    const {regionGraph} = store;
    useEffect(() => {
        if (regionGraph.length) {
            const labels = regionGraph.map(v => v.area);
            const points = {male: [], female: []};
            regionGraph.forEach(obj => {
                if (obj.male) points.male.push(obj.male)
                if (obj.female) points.female.push(obj.female)
            });
            setDataset(prev => ({
                labels: {...prev.labels, region: labels},
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
