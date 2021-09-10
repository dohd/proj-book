import React, { useState } from 'react';
import moment from 'moment';

import CalendarContainer from './CalendarContainer';
import EventPlanModalContainer from './EventPlanModalContainer';
import setCalendar, { currentYear, currentMonth } from 'utils/setCalendar';
import { useTracked } from 'context';
import Api from 'api';
import { clientSocket } from 'utils';

const fetchActivityPlans = async dispatch => {
    const activityPlans = await Api.activityPlan.get();
    dispatch({ type: "addActivityPlans", payload: activityPlans });

    const activitySchedule = await Api.activitySchedule.get();
    const eventsDataMap = {activityPlans, activitySchedule};
    for (const event in eventsDataMap) {
        clientSocket.emit(event, eventsDataMap[event]);
    }
};

export default function EventPlanContainer() {
    const calendar = setCalendar(currentMonth, currentYear);
    const [state, setState] = useState({ 
        currentMonth, currentYear, 
        monthData: calendar.monthData,
        monthTitle: calendar.monthTitle,
        load: false
    });
    
    const handleNext = () => {
        const currentYear = state.currentMonth === 11 ? 
            state.currentYear + 1 : state.currentYear;

        const currentMonth = (state.currentMonth + 1) % 12;
        const calendar = setCalendar(currentMonth, currentYear);
        setState(prev => ({
            ...prev, currentMonth, currentYear,
            monthData: calendar.monthData,
            monthTitle: calendar.monthTitle,
            load: !prev.load 
        }));
    };

    const handleBack = () => {
        const currentYear = state.currentMonth === 0 ? 
            state.currentYear-1 : state.currentYear;

        if (currentYear < 2020) return;
        const currentMonth = state.currentMonth === 0 ? 
            11 : state.currentMonth - 1
        
        const calendar = setCalendar(currentMonth, currentYear);
        setState(prev => ({
            ...prev, currentMonth, currentYear, 
            monthData: calendar.monthData,
            monthTitle: calendar.monthTitle,
            load: !prev.load
        }));
    };

    const onChangeMonth = month => {
        const calendar = setCalendar(month, state.currentYear);
        setState(prev => ({
            ...prev, 
            monthData: calendar.monthData,
            monthTitle: calendar.monthTitle,
            currentMonth: month,
            load: !prev.load
        }));
    };

    const onChangeYear = year => {
        const calendar = setCalendar(state.currentMonth, year);
        setState(prev => ({
            ...prev, 
            monthData: calendar.monthData,
            monthTitle: calendar.monthTitle,
            currentYear: year,
            load: !prev.load
        }));
    };

    const [store, dispatch] = useTracked();

    const checkEventDay = day => {
        const { currentMonth, currentYear } = state;
        let isEventDay = false;
        for (const event of store.activityPlans) {
            const eventDate = moment(event.date).startOf('day');
            const calDate = moment(`${currentYear}-${currentMonth+1}-${day}`)
                .startOf('day');
            if (eventDate.isSame(calDate)) isEventDay = true;
        }
        return isEventDay;
    };

    // modal logic
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState({
        plans: [], eventDate: ''
    });

    const showModal = day => {
        setVisible(true);
        const { currentMonth, currentYear } = state;
        const d = new Date(currentYear, currentMonth, day);
        const calendarDate = moment(d).format('YYYY-MM-DD');    

        const plans = [];
        let eventDate = '';
        for (const plan of store.activityPlans) {
            const { planEvents } = plan;
            for (const event of planEvents) {
                if (calendarDate === event.date) {
                    eventDate = event.date;
                    plans.push(plan);
                }
            }
        }
        setDataSource(prev => ({...prev, plans, eventDate }));
    };

    const calendarProps = {
        state, handleNext, handleBack, checkEventDay,
        onChangeMonth, onChangeYear, showModal,
    };
    
    const modalProps = {
        visible, setVisible, 
        participants: store.participants,
        activityPlans: dataSource.plans,
        eventDate: dataSource.eventDate,
        fetchActivityPlans: () => fetchActivityPlans(dispatch)
    };
    
    return (
        <>
            <CalendarContainer {...calendarProps} />
            <EventPlanModalContainer {...modalProps} />
        </>
    );
}