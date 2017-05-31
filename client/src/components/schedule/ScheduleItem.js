import React from 'react';
import {getTime, formatDate} from '../../lib/helpers';

const ScheduleItem = (props) => {
    const schoolList = props.school.map(item => item.name).join(", ");
    return (
        <div>
            <b>{props.name}</b><br/>
            <span className="text-muted small">{formatDate(props.start)} ({getTime(props.start)} - {getTime(props.finish)})</span><br/>
            Лектор: {props.lecturer}<br/>
            Школа: {schoolList}<br/>
            Аудитория: {props.classroom.name}
            <hr/>
        </div>
    )
};

export default ScheduleItem;