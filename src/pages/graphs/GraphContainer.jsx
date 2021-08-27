import React, { useState, useEffect } from 'react';

import './graph.css';
import ProgrammeGraph from './ProgrammeGraph';
import RegionGraph from './RegionGraph';
import { useTracked } from 'context';
import barchart from './barchart';

export default function GraphContainer() {
    const [store, dispatch] = useTracked();
    const [labels, setLabels] = useState({
        programme: [], region: []
    });
    const [data, setData] = useState({
        programme: {}, region: {}
    });

    const {programmeGraph} = store;
    useEffect(() => {
        if (programmeGraph.length) {
            const labels = programmeGraph.map(v => v.programme);
            const dataset = {male: [], female: []};
            programmeGraph.forEach(obj => {
                if (obj.male) dataset.male.push(obj.male)
                if (obj.female) dataset.female.push(obj.female)
            });

            setLabels(prev => ({...prev, programme: labels}));
            setData(prev => ({...prev, programme: dataset}));
        }
    }, [programmeGraph]);

    const {regionGraph} = store;
    useEffect(() => {
        if (regionGraph.length) {
            const labels = regionGraph.map(v => v.area);
            const dataset = {male: [], female: []};
            regionGraph.forEach(obj => {
                if (obj.male) dataset.male.push(obj.male)
                if (obj.female) dataset.female.push(obj.female)
            });

            setLabels(prev => ({...prev, region: labels}));
            setData(prev => ({...prev, region: dataset}));
        }
    }, [regionGraph]);

    const [chartData, setchartData] = useState({
        programme: {}, region: {}
    });
    useEffect(() => {
        const chart = barchart(labels, data);
        setchartData(chart);
    }, [labels, data]);

    const progGraphProps = {
        data: chartData.programme,
        apiKey: 'programmeGraph',
        actionType: 'addProgrammeGraph',
        dispatch
    };
    const regionGraphProps = {
        data: chartData.region,
        apiKey: 'regionGraph',
        actionType: 'addRegionGraph',
        dispatch
    };

    return (
        <div className='graph-container'>
            <ProgrammeGraph {...progGraphProps} />
            <RegionGraph {...regionGraphProps} />
        </div>
    );
}
