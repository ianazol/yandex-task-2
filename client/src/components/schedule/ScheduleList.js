import React from 'react';
import ScheduleItem from './ScheduleItem';

const ScheduleList = (props) => {
    return <div>{props.lectures.map(lecture => <ScheduleItem key={lecture._id} {...lecture} />)}</div>
};

export default ScheduleList;