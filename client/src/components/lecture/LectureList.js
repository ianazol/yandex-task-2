import React from 'react';
import LectureItem from './LectureItem';

export const LectureList = (props) => {
    return (
        <div>
            <h4>Список лекций</h4>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
            <hr/>
            <div className="lectureList">
                {props.lectures.map(lecture => <LectureItem key={lecture._id} {...lecture} {...props} />)}
            </div>
            <br/>
        </div>
    );
};