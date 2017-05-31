import React from 'react';
import LectureEdit from './LectureEdit';
import withFormToggle from '../../hoc/withFormToggle';
import {getTime, formatDate} from '../../lib/helpers';

const LectureItem = props => {
    const handleRemove = event => {
        event.preventDefault();
        props.remove(props._id);
    };

    const schoolList = props.school.map(item => item.name).join(", ");

    return (
        <div className="lecture-item">
            <div className="row">
                <div className="col-8">
                    <b>{props.name}</b><br/>
                    <span className="text-muted small">{formatDate(props.start)} ({getTime(props.start)}-{getTime(props.finish)})</span><br/>
                    Лектор: {props.lecturer}<br/>
                    Школа: {schoolList}<br/>
                    Аудитория: {props.classroom.name}<br/>
                </div>
                <div className="col-4">
                    <button className="btn btn-link btn-sm" onClick={props.openForm}>Редактировать</button>
                    <button className="btn btn-link btn-sm" onClick={handleRemove}>Удалить</button>
                </div>
            </div>
            {props.editFormOpen && <LectureEdit {...props} handleClose={props.closeForm}
                                                schools={props.schools} classrooms={props.classrooms} />}
            <hr/>
        </div>
    );
};

export default withFormToggle(LectureItem);