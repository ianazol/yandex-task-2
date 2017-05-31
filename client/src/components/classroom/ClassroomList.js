import React from 'react';
import ClassroomItem from './ClassroomItem';

export const ClassroomList = (props) => {
    return (
        <div>
            <h4>Список аудиторий</h4>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
            <hr/>
            <div className="classroomList">
                {props.classrooms.map(classroom => <ClassroomItem key={classroom._id} {...classroom}
                                                                  remove={props.remove} update={props.update} />)}
            </div>
            <br/>
        </div>
    );
};